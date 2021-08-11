# Eatabel Mobile

<img width="1166" alt="Eatabel" src="https://user-images.githubusercontent.com/34781793/129108825-663f1c18-448d-46f1-8f3e-bf75b295f1e6.jpg">

## Introduction

Eatabel is a Mobile Application which aims to assist users in finding food choices which fit their needs and styles. A common problem for me, is scouring the ingredients list to buy an item, only to come home and realize there is an ingredient in it which I cannot eat. Eatabel aims to solve this problem, by offering users a quick and easy way to check if an item fits their dietary restrictions.

## What does this App provide?

- Eatabel is built on React Native in conjunction with Expo. Eatabel cannot function on it's own and needs to be run in conjunction with <a href="https://github.com/Eatabel/EatabelServer">the Eatabel Server</a>


## How to use?

In order to start the app, please run the following steps:

1. `cd eatabel`
2. `npm install`
3. `expo start`

## How does it work?

Under the hood, Eatabel takes a user's preferences, and maps them onto any search. A user can search by title or by UPC, and Eatabel will filter through the ingredient's list to see if there are any conflicts based on a user's preferences.

## Future Improvements
Plans for Eatabel include deploying it to both Android Phones and iPhones, as well as deploying a Browser Version (at Eatabel.com), and running the Eatabel API Server through that domain. Further plans include adding the functionality to track nutritional values, for example adding an item to your current day's meal to see how it affects your planned calories for the day.
