chrome extension that tracks productivity 
underwater theme (lots of blue, maybe seaweed, fish, bubbles, treasure )
  - user can select websites to block during the study session
  - start a timer during each study session and it counts down then you can take a break
  - after each study session you earn coins (maybe some ocean theme coin) that you can buy new fish with
  - multiple tabs
    - blocked sites
      - tab where you can enter certain urls that will be blocked during the study session
      - when you go to the website like tiktok or insta it shows a fish and says blocked by fish 
    - study
      - main page with the timer and how long you have been studying 
      - maybe a quote or something 
      - countdown to a certain test? something to motivate the user to study for 
    - shop
      - page where a bunch of fish skins present and you can buy them for diffirent amount of coins
      - super expensive gold fish for the most devoted studiers 
    - stats 
      - shows how long you have studied for in your life time 
      - maybe add a pie chart of what subjects you studied for (user would write subject after study session)
    - to do list 
      - have user able to write what they need to do and focus on 
      -
    
    features 
    - add some sounds
    - user can name their fish 
    - one minute equals one sanddollar
  
    fishes that we are going to have for the project
     - goldfish
     -

  // this is to set the total minutes 
    chrome.storage.local.get("gameState", (r) => {
      r.gameState.totalMinutes = 120; // change this number
      chrome.storage.local.set({ gameState: r.gameState });
    });
    
  // this is to see the current state
  chrome.storage.local.get(null, console.log)
  
  // this is to see the achievements
  chrome.storage.local.get("gameState", (r) => {
    r.gameState.unlockedAchievements = ["firstDive", "gettingDeep"];
    chrome.storage.local.set({ gameState: r.gameState });
  });
  
  // this is to unlock specific fishes
  chrome.storage.local.get("gameState", (r) => {
    r.gameState.unlockedFish = ["blueFish", "nemoFish", "tuna", "shark"];
    chrome.storage.local.set({ gameState: r.gameState });
  });
  
  // reset the gameState
  chrome.storage.local.remove("gameState")
  
  dolphin
  green yellow fish
  jellyfish
  nemo
  tuna
  turtle
