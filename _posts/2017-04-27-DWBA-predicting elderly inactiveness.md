---
layout: post
title:  "[Project] Forecasting and detecting elderly inactiveness"
date:   2017-04-27
categories: [my_projects]
---

# Overview #
--- 
**Description**: 

**Abstract Poster Link:** 

**Full Report Link:** 

**Tools Used:** Python, Microsoft Azure Machine Learning, Tableau, JMP, Microsoft Data Server (Data Warehouse), SAS Enterprise

**Main Learning Points:** Microsoft Azure Machine Learning, ARIMA Time Series Forecasting(Evaluating and forecasing)

# Detailed Explanation #
---
For this project, we are working with SMU-TCS iCity Lab to create a detection and forecasting model to detect motion in an elderly home. This would help us to determine whether an elderly is active or inactive, and using this information, we would analyse whether their activity is normal or abnormal.

Some of the other business questions the project intends to analyze is:
1. Are the elderly visiting the bathrooms too often/little, which could indicate an underlying health condition?
2. What is the normal level of bathroom activity for each subject?

## Data Warehousing/ETL/Data Cleaning ##
---
For the dataset, we are given data from SMU-TCS iCity of the motion sensors detected in an elderly home. Below shows an example of how the motion senses are distributed in the house. Due to confidentialy issues, we are not able to disclose any data.

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-04-27-DWBA-img1.png" alt="Motion Sensor sample distribution" style="margin:0px auto;width:600px;"/>
<center>Motion Sensor sample distribution</center><br>

For the data, we are using a star schema for the data warehouse using Microsoft SQL Server. As for a very large dataset, a star schema is optimized for a very large dataset and the performance of the general queries is much faster. 

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-04-27-DWBA-img2.png" alt="Star Schema for Data Warehouse" style="margin:0px auto;width:600px;"/>
<center>Star Schema for Data Warehouse</center><br>

For the ETL Process, we used Microsoft SQL Server and Python. First, we would extract the data in the Microsoft SQL Server, and the transforming would be done using Python scripts as they are very flexible and you can wrangle the data accordingly.

## Explantory Data Analysis (EDA) ##
---
For our EDA process, we want to find whether the data is stationary, since it is one of the requirements for using ARIMA. In addition, we would also want to see if seasonality is present in the data set.

A stationary time series is exemplified by a stable mean and variance over time. Seasonality (having a recurrent pattern with fixed and known duration) and trend are not present. I repeating this test for the all subjects also reveals similar signs of a possible stationary time series. A stationary time series would tend to converge towards its mean over the long run. 


<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-04-27-DWBA-img3.png" alt="Aggregated Daily Bathroom sensor activity Count for a subject" style="margin:0px auto;width:600px;"/>
<center>Aggregated Daily Bathroom sensor activity Count for a subject</center><br>

## ARIMA ##
---
Given that the data seems to follow a stationary time series, an Autoregressive Integrated Moving Average (ARIMA) model might be appropriate to predict the normal level of bathroom activity count over time for each subject. The forecasting equation can be portrayed as an ARIMA(p, d, q) model where p is the number of period lags for the autoregressive model; d is the number of non-seasonal differences needed for stationarity, or the degree of differencing; and q is the order of the moving average, or the number of lagged forecast errors.

Autoregressive refers to how far can past values be used to predict the current value of the model itself. For example, if a time series data can be best explained and had its current value predicted by using its past 3 values, then its ARIMA model would be best suited to take an AR (p) value of 3.

Differencing refers to the number of times the data has had their past values subtracted, and is commonly used to account for seasonality. If ARIMA is to be used on a non-stationary time series, the data first has to be differenced by a degree of d periods.

Moving Average refers to the number of past forecast errors, rather than past values used in an Autoregressive model, to use in a regression model

In addition to detecting stationarity in the dataset, we would want to further detect whether there is stationarity in the data more accurately. As such, we would be using Dickey Fuller Test, using Python. 

After performing the Dickey Fuller Test on all the subjects at the 95% significance level, we obtained p-values which were lower than 0.05 required, therefore the null hypothesis is rejected and it is concluded that their bathroom activity data follows a stationary trend. In many cases, the p-values were extremely small, as show in the figure below.

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-04-27-DWBA-img4.png" alt="Dickey Fuller Test Results from Python" style="margin:0px auto;width:600px;"/>
<center>Dickey Fuller Test Results from Python</center><br>

For an ARIMA prediction model to be evaluated, there are 2 ways in which this can be done. Namely Akaike Informaiton Criterion (AIC) and Bayesian Information Criterion (BIC). The lower the AIC and BIC a model has in comparison with other models, the better the model is. This is also used to aid us in determining the best ARIMA model to use for each individual elderly on their bathroom usage habits

In order to evaluate the best ARIMA prediction model, our group has used Microsoft Azure Machine Learning to do the following:
1. Retrieve the data from the Microsoft SQL Server (Data Warehouse).
2. Conduct Data Cleaning, cleaning all the data and fix any outliers in the data. 
3. Conduct time-series forecasting using ARIMA models, creating a visualisation or actual vs. predicted as well as the AIC and BIC of that ARIMA parameter.
4. Return a list of all ARIMA parameters into one section
5. Convert the list of all ARIMA parameters into a csv file. 

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-04-27-DWBA-img6.png" alt="Microsoft Azure Machine Learning Layout" style="margin:0px auto;width:600px;"/>
<center>Microsoft Azure Machine Learning Layout</center><br>

<img class="img-responsive" src="http://www.datayse.com/static/img/blogpost/2017-04-27-DWBA-img5.png" alt="Actual vs. Predicted Bathroom Activity" style="margin:0px auto;width:600px;"/>
<center>Actual vs. Predicted Bathroom Activity</center><br>

## Results ##
---
Although we were able to quickly and efficiently find the right ARIMA parameters for the best predictive model, the overall model may still be weak. This is due to plotting a residual plot in SAS as well as the Residual Sum of Squares Error (RSS) of the model is relatively high. In order for the model to be more accurate, we may need more accurate data and a better grasp of understanding the ARIMA model as a whole.

However, we our team still managed to be able to predict normal bathroom behavior for the elderly. From normal behavior, we are able to detect outliers and the change in overall bathroom activity for that elderly. From this insight, we are able to inform the relevant stakeholders for them to follow up accordingly. 

Lastly, using Microsoft Azure Machine Learning, we were able to also achieve the following:  
- Using Microsoft Azure Machine Learning, we are able to quickly procure the best ARIMA parameters since all calculations are done on the cloud. From the best ARIMA model, an anomaly detection can be setup to automatically detect outliers/strange behavior. 
- Real-time output from Microsoft Azure Machine Learning. Data can be actively fed into the system which allows for any outlier to be immediately detected. Enabling for stakeholders to conduct faster decision making. 
- In addition, we are able to quickly fit the data efficiently. We are able to quickly forecast for any elderly for any location. As compared to using Of-the-shelf software, it is very hard to achieve due to the amount of manual work required. 


