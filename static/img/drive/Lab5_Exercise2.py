#imports
import pandas as pd
import numpy as np
import json
import re
import nltk
import yaml
from nltk.corpus import stopwords
from collections import Counter
from nltk.tokenize import word_tokenize
from wordcloud import WordCloud
import matplotlib.pyplot as plt
      
#Peter Norvig's Spell Checker################################
def words(text): return re.findall(r'\w+', text.lower())

WORDS = Counter(words(open('big.txt').read()))

def P(word, N=sum(WORDS.values())): 
    "Probability of `word`."
    return WORDS[word] / N

def correction(word): 
    "Most probable spelling correction for word."
    return max(candidates(word), key=P)

def candidates(word): 
    "Generate possible spelling corrections for word."
    return (known([word]) or known(edits1(word)) or known(edits2(word)) or [word])

def known(words): 
    "The subset of `words` that appear in the dictionary of WORDS."
    return set(w for w in words if w in WORDS)

def edits1(word):
    "All edits that are one edit away from `word`."
    letters    = 'abcdefghijklmnopqrstuvwxyz'
    splits     = [(word[:i], word[i:])    for i in range(len(word) + 1)]
    deletes    = [L + R[1:]               for L, R in splits if R]
    transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
    replaces   = [L + c + R[1:]           for L, R in splits if R for c in letters]
    inserts    = [L + c + R               for L, R in splits for c in letters]
    return set(deletes + transposes + replaces + inserts)

def edits2(word): 
    "All edits that are two edits away from `word`."
    return (e2 for e1 in edits1(word) for e2 in edits1(e1))
########################################################

#Sentiment Analysis
dict_tagged_sentences = ''
DICTIONARY_DIR_PREFIX = 'dicts/'

class Splitter(object):
    def __init__(self):
        self.nltk_splitter = nltk.data.load('tokenizers/punkt/english.pickle')
        self.nltk_tokenizer = nltk.tokenize.TreebankWordTokenizer()

    def split(self, text):
        sentences = self.nltk_splitter.tokenize(text)
        tokenized_sentences = [self.nltk_tokenizer.tokenize(sent) for sent in sentences]
        return tokenized_sentences


class POSTagger(object):
    def __init__(self):
        pass

    def pos_tag(self, sentences):
        pos = [nltk.pos_tag(sentence) for sentence in sentences]
        #adapt format
        pos = [[(word, word, [postag]) for (word, postag) in sentence] for sentence in pos]
        return pos

class DictionaryTagger(object):
    def __init__(self, dictionary_paths):
        files = [open(path, 'r') for path in dictionary_paths]
        dictionaries = [yaml.load(dict_file) for dict_file in files]
        map(lambda x: x.close(), files)
        self.dictionary = {}
        self.max_key_size = 0
        for curr_dict in dictionaries:
            for key in curr_dict:
                if key in self.dictionary:
                    self.dictionary[key].extend(curr_dict[key])
                else:
                    self.dictionary[key] = curr_dict[key]
                    self.max_key_size = max(self.max_key_size, len(key))

    def tag(self, postagged_sentences):
        return [self.tag_sentence(sentence) for sentence in postagged_sentences]

    def tag_sentence(self, sentence, tag_with_lemmas=False):
        tag_sentence = []
        N = len(sentence)
        if self.max_key_size == 0:
            self.max_key_size = N
        i = 0
        while (i < N):
            j = min(i + self.max_key_size, N) #avoid overflow
            tagged = False
            while (j > i):
                expression_form = ' '.join([word[0] for word in sentence[i:j]]).lower()
                expression_lemma = ' '.join([word[1] for word in sentence[i:j]]).lower()
                if tag_with_lemmas:
                    literal = expression_lemma
                else:
                    literal = expression_form
                if literal in self.dictionary:
                    #self.logger.debug("found: %s" % literal)
                    is_single_token = j - i == 1
                    original_position = i
                    i = j
                    taggings = [tag for tag in self.dictionary[literal]]
                    tagged_expression = (expression_form, expression_lemma, taggings)
                    if is_single_token: #if the tagged literal is a single token, conserve its previous taggings:
                        original_token_tagging = sentence[original_position][2]
                        tagged_expression[2].extend(original_token_tagging)
                    tag_sentence.append(tagged_expression)
                    tagged = True
                else:
                    j = j - 1
            if not tagged:
                tag_sentence.append(sentence[i])
                i += 1
        return tag_sentence

def value_of(sentiment):
    if sentiment == 'positive': return 1
    if sentiment == 'negative': return -1
    return 0

def sentence_score(sentence_tokens, previous_token, acum_score):
    if not sentence_tokens:
        return acum_score
    else:
        current_token = sentence_tokens[0]
        tags = current_token[2]
        token_score = sum([value_of(tag) for tag in tags])
        if previous_token is not None:
            previous_tags = previous_token[2]
            if 'inc' in previous_tags:
                token_score *= 2.0
            elif 'dec' in previous_tags:
                token_score /= 2.0
            elif 'inv' in previous_tags:
                token_score *= -1.0
        return sentence_score(sentence_tokens[1:], current_token, acum_score + token_score)
    
def sentiment_score(sentences):
    return sum([sentence_score(sentence, None, 0.0) for sentence in sentences])


def run_analysis(text):
    splitter = Splitter() # This boy will split a long single string into sentences.
    postagger = POSTagger() # This boy is the Part-Of-Speech tagger.

    # If text contains multiple sentences, this line splits it into individual sentences.
    splitted_sentences = splitter.split(text)
    splitted_sentences_2 = []
    
   
    for sentence in splitted_sentences:
        #print(sentence)
        temp_sentence=[]
        for word in sentence:
            if word not in stop_words:
                word = (correction(word))
                if word not in stop_words:
                    temp_sentence.append(word.strip().lower())
        splitted_sentences_2.append(temp_sentence)
        
    # This performs Part-Of-Speech tagging.
    pos_tagged_sentences = postagger.pos_tag(splitted_sentences_2)

    dicttagger = DictionaryTagger([ DICTIONARY_DIR_PREFIX + 'positive.yml', DICTIONARY_DIR_PREFIX + 'negative.yml', DICTIONARY_DIR_PREFIX + 'inc.yml', DICTIONARY_DIR_PREFIX + 'dec.yml', DICTIONARY_DIR_PREFIX + 'inv.yml'])
    dict_tagged_sentences = dicttagger.tag(pos_tagged_sentences)
    score = sentiment_score(dict_tagged_sentences)
    return score

################### This is the MAIN section ###################
if __name__ == "__main__":
            
    #ALL Required Variables and initializations#
    fname = 'Lab4_UKText.txt'
    textList = []
    wordcloudtext= []
    twitterTextList = []
    stop_words = stopwords.words('english')
    ############################################
        
    #Text retrieval##############################
    with open(fname) as f:
        for idx, line in enumerate(f):
            if (len(line) > 10):
                try:
                    twitterTextList.append(json.loads(line)["retweeted_status"]['text'])
                except:
                    twitterTextList.append(json.loads(line)['text'])
            
    df = pd.DataFrame(np.array(twitterTextList), columns=["twitter_text"])
    df = df[0:2000] #take only first 2000 Comments
    ############################################
    
    #Text Cleaning##############################
    df_comments = df['twitter_text']
    
    for idx, comments in enumerate(df_comments):
        #tokenize, remove stop words, stemming
        comments = word_tokenize(comments)
        for word in comments:
            if word not in stop_words:
                word = (correction(word))
                if word not in stop_words:
                    wordcloudtext.append(word.lower())
    ############################################
    
    #create a file with the number of occurance for each word (QUESTION 4)
    wordListDict = Counter(wordcloudtext)
    occurance_df = pd.DataFrame(dict(wordListDict), index=[0]).transpose()
    occurance_df.to_csv('UK_occurance.csv')
    ############################################
    
    #Generate words for the wordcloud and save the wordcloud (QUESTION 4)
    words_joined = " ".join([w for w in wordcloudtext])
    my_wordcloud = WordCloud(background_color='white', width=1800, height=1400).generate(words_joined)

    plt.imshow(my_wordcloud)
    plt.axis('off')
    plt.savefig('WordCloud_UK.png', dpi=300)
    plt.show()
    ############################################
	   
    #Sentiment Analysis (QUESTION 5)###########
    #Take note, for the dict, I've included 2018 positive words, 4794 negative words, 23 decrements, 54 increments and 47 inverters
    for index, comment in enumerate(df_comments):
        df.loc[index, 'sentiment'] = run_analysis(comment)
        
    df.to_csv("UK_sentiment.csv")
    ############################################
    

