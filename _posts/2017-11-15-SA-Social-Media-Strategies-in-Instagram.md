---
layout: post
title:  "[Project] Social Media Strategies in Instagram"
date:   2017-11-15
categories: [my_projects]
---

# Overview #
--- 
**Abstract Poster Link:** [Abstract Poster](https://drive.google.com/file/d/1zo598YFzL_9RKpZsdX4cEf3bl6v7cICA/view?usp=sharing)

**Full Report Link:** [Full Report](https://drive.google.com/file/d/1X_0Llc2AeDspls6RbbVmFjomCVhIZDTK/view?usp=sharing)

**Final Presentation Link**: [Final Presentation](https://drive.google.com/file/d/1wJumdXmx5dLxH0aQUMOnWUC3zStXcPjP/view?usp=sharing)

**Tools Used:** Python, Tableau, py-tesseract

**Results:** We implemented the social media strategies that we have identified from data analytics to our sponsor's Instagram account. Compared his previous 7 post (before implementation) and his latest 7 post (after implementation), it has result in the following:
- **Average Likes Per Post** - 2443 vs 1766 average likes per post (38.3% increase in average likes per post)
- **Total Comments** - 388 vs 303 comments in 7 posts (28.1% increase in total comments)
- **Increase in Followers in 9 days period** - 659 vs. 422 increase in followers (56.2% increase in increase of followers)
- **Highest number of likes for one post** - 3189 likes, previously highest was 3052 likes

**Learning Points:** Web scraping (BeautifulSoup4), NLTK, sentiment analysis and sentiment analysis of Emojis.

# Detailed Explanation #
---
Timothy Joshua Chia is a writer based in Singapore. He focuses mainly on writing poems (and some short stories as well) and showcases these writings through social media platforms (mainly Instagram and Facebook). The goal is to increase his reach and to get a larger audience of followers. The higher the number of followers, the more outreach and popular one is. His instagram tag is [@timoteijosh](https://www.instagram.com/timoteijosh)

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-11-15-SA-img-1.png" alt="Sample of Timothy's Instagram Page" style="margin:0px auto;width:500px;"/>
<center><b>Sample of Timothy's Instagram Page</b></center><br>

The approach to this social media campaign is to do the following:
1. Analysing existing content on Timothy’s Instagram account as well as other well-known poetry Instagram accounts (Competitor Analysis)
2. Through our analysis, we will aim derive potential strategies which Timothy can use to improve his outreach (Insight Generation)
3. Trial some of the proposed strategies and measure their effects as an assessment of the strategies (Social Media Strategies)


## Web Scraping/OCR/Data Cleaning ##
---
For the data, we need to obtain the data from our sponsors Instagram account and other popular poetry Instagram accounts. We intend to use web scraping to obtain all these information.

The data that we would be interested in getting is as follows:

**Posts**

| Data        | Description           |
| ------------- |---------------|
| post_id    | the id of the post (used as primary key) |
| instagram_handle      | the handle of the poster      |
| caption | the caption of the post      |
| image_url | the url of the image for OCR (later)      |
| datestamp | the datetimestamp of the post      |
| total_likes | total number of likes when scraping      |
| total_comments | total number of comments when scraping      |

**Comments**

| Data        | Description           |
| ------------- |---------------|
| parentpost_id    | the id of the parent post |
| instagram_handle      | the handle of the commenter      |
| comment | the comment contents      |
| datestamp | the datetimestamp of the comment      |


<br>
Web scraping is done via a couple of python scripts. Firstly, we created a Python script to loop through the Instagram URL’s of the 6 accounts. In this script, we get the individual post URLs. For each account, we have extracted out about 3 to 4 months worth of posts (roughly from end June to mid October).

After extracting the URL of each individual post, we then used another Python script to loop through these URLs and extract the data we need. This data would then be stored in a csv format, with an encoding of UTF-8 so that emojis can be properly stored.

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-11-15-SA-img-2.png" alt="Overview of Web Scraping" style="margin:0px auto;width:500px;"/>
<center><b>Overview of Web Scraping</b></center><br>

In addition to web scraping, we used Google's Py-tesseract to obtain the text in the poetry posted by the various Instagram accounts. Using Py-tesseract, we were able to get >90% accuracy. Below is an example of the accuracy of the OCR employed. 

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-11-15-SA-img-3.png" alt="Output from Py-tesseract" style="margin:0px auto;width:500px;"/>
<center><b>Output from Py-tesseract</b></center><br>


## Explantory Data Analysis (EDA) ##
---
**Sentiment Analysis (Text & Emoji)**
By analysing the overall sentiment of his account, we can identify where his account is well liked by his followers. Next, by analysing his post, we can also identify which posts have a higher positive sentiment and thus use posts of similar concepts in future posts, vice versa.

However, there is an issue analysing Instagram comments using sentiment analysis. Unlike food reviews or tweets, the problems that we face when analysing instagram comments are as follows:
●	Very short (most comments are < 50 characters)
●	Usually only contains Emojis or emoticons (e.g. :-D, 😀)
●	Uses many punctuation (e.g. !!!, ?!?)
●	Capitalized characters to emphasis(e.g. VERY)
●	Adjusted intensity (e.g. very, kind of, uber)
●	Slangs (e.g. sux, etc.)

As such, in order to deal with these issues, our group has implemented [Valence Aware Dictionary and sEntiment Reasoner (VADER)](https://github.com/cjhutto/vaderSentiment). VADER is a lexicon and rule-based sentiment analysis tool that is used primarily for social media. This implementation takes cares of all the above problems on social media comments, except for emojis. Our group deal with this issue by adding emojis into the lexicon.

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-11-15-SA-img-4.png" alt="Example of Sentiment Analysis with VADER" style="margin:0px auto;width:600px;"/>
<center><b>Example of Sentiment Analysis with VADER</b></center><br>

After applying sentiment analysis, we identified post with a desirable response and posts with undesirable responses. Below are the analysis of 2 post, the first one with undesirable response (comments that mostly have negative sentiment) while the other one with desirable response (comments that are mostly have positive sentiment). From this 2 posts, we can identify that his followers may not want to hear about topics such as “breakup” or “heartbreak”, but would want to read poems about “love” and “soul mate”.

Timoteijosh may use this information to his advantage and post love poems, but only towards find soulmates, while avoiding poems of heartbreak and breaking up. 

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-11-15-SA-img-5.png" alt="Post with undesirable response" style="margin:0px auto;width:600px;"/>
<center><b>Post with undesirable response</b></center><br>

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-11-15-SA-img-6.png" alt="Post with desirable response" style="margin:0px auto;width:600px;"/>
<center><b>Post with desirable response</b></center><br>

The group has completed other analysis such as optimal time analysis, poem length and like count correlation, content and like count correlation and Hashtag effectiveness. However, these were not done by me, if you wish to view in detailed, you can view the [full report](https://drive.google.com/file/d/100waJQwHcEtZ0qYykF4orMUu-cycAY-L/view?usp=sharing)/[final presentation](https://drive.google.com/file/d/1xGARhpco0xE-JHUjb93cECOdGET9T5RR/view?usp=sharing)

## Outcomes ##
---
Timothy has till date posted 7 posts using our recommended hashtags since November 6. For the 7 posts using our recommended hashtags, there has been a general increase in the likes per post averaging at 2443 likes per posts compared to the previous 7 posts before implementation at 1766 likes per posts. Timothy has also reached the highest number of likes (3189 vs 3052 previously) using our recommended hashtags. From the post, we can see that there is more total comments in each post, a total of 301 comments was posted before recommended hashtags and 388 comments was posted after. Lastly, we have also looked at the total number of instagram followers for Timothy before and after using our recommended hashtag, where we can see a gradual increase in the number of followers.

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-11-15-SA-img-7.png" alt="Summary of Outcomes from Social Media Campaign" style="margin:0px auto;width:600px;"/>
<center><b>Summary of Outcomes from Social Media Campaign</b></center><br>
 
He started using our recommended hashtags on 6 November. While we cannot conclude that the increased rate of followers increase is due to the new hashtags, it has offered promising signs that the new strategy is moving in the right direction.


