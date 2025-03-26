// Starts game!
function startGame()
{
    window.location.href = "game.html";
}

// Keep track of score - reveal if good/bad at end
let score = 0;
// Keep track of current scenario
let currentScene = 0;

// Individual responses for each answer - tells them why their choice was good/bad
const feedbackData = 
{
    0: { // Scene 1's responses
        1: {
            title: "Oops!",
            text: "You got bit!<br>The dog was not friendly. <br>It's best to contact your local animal shelter and let the professionals take care of it."
        },
        2: {
            title: ":(",
            text: "Unfortunately, due to your ignorance, the stray dog has been hit by a car. <br>You could have prevented this."
        },
        3: {
            title: "Yay!",
            text: "Your local animal shelter arrived and saved the dog from the busy road. He was aggressive, so best to leave it to trained professionals!"
        }
    },

    1: { // Scene 2's reponses
        1: {
            title: "Oh no!",
            text: "You got beat up!<br>While you have good intentions, it's never a good idea to place yourself in harm's way. <br> Always look for security or a nearby garda to de-escalate the situation."
        },
        2: {
            title: "Exactly!",
            text: "Never place yourself in harm's way, it's always a good idea to grab someone who de-escalates situations like these for a living!"
        },
        3: {
            title: "Well...",
            text: "While you did good and put yourself out of harm's way, your ignorance resulted in both parties sustaining serious injuries and needing an ambulance. <br>Try help next time!"
        }
    },

    2: { // Scene 3's responses
        1: {
            title: "Hmm...",
            text: "You mean well, but it's best to message the classmate privately. <br>Publicly defending them could potentially escalate the situation, and that's not very peaceful! "
        },
        2: {
            title: "Well done!",
            text: "It's best to offer support privately without drawing further public attention to their post."
        },
        3: {
            title: "Bad classmate",
            text: "A small gesture such as offering to listen to your classmate can make a world of a difference to them. <br>Don't ignore them when they need the support the most!"
        }
    },

    // 3: { // Scene 4's responses
    //     1: {
    //         title: "Ruined night",
    //         text: "The mood within your friend group has shifted.<br>Ignoring your friend and staying quiet only gave them more room to make inappropriate jokes."
    //     },
    //     2: {
    //         title: "Night saved!",
    //         text: "While it may not be the obvious answer, changing the topic allows you to reduce the tension for now.<br>Speak to them about their inappropriate jokes when they're sober!"
    //     },
    //     3: {
    //         title: "Uh oh...",
    //         text: "Your now publicly humiliated, drunk friend has now become defensive and violent!<br>Maybe you should have waited until they were sober."
    //     }
    // },
};

// Possible scenarios - more + more difficult 
const scenarios = [

    // Scene 1 - Stray dog
{
    text: "You're walking home on a busy road and notice a stray dog that looks scared and malnourished. <br>You are unsure if the dog is aggressive or friendly. Do you...",
    options: 
    [
        { text: "Pull the dog off the road into safety", impact: 0},
        { text: "Ignore the stray and leave it to the next passerby", impact: -1 },
        { text: "Contact your local animal shelter and report the stray", impact: 1 }
    ]
},
    // Scene 2 - Arguing strangers
{
    text: "You witness an argument between two groups that's about to get physical. Do you...",
    options:
    [
        { text: "Step in yourself and try to de-escalate the situation", impact: 0 },
        { text: "Look for security / a nearby garda to step in", impact: 1 },
        { text: "Ignore them and keep walking", impact: -1 }
    ]
},
    // Scene 3 - Helping a classmate
{
    text: "An embarrassing post has been made about your classmate on social media. Do you...",
    options: 
    [
        { text: "Defend your classmates in the comments of the post", impact: 0 },
        { text: "Message your classmate privately to offer support", impact: 1 },
        { text: "Ignore the post and hope people forget about it", impact: -1 }
    ]
},
//     // Scene 4 - Stranger's bags
// {
//     text: "You're out for a drink with a group of friends when one friend, who has had a bit too much to drink, starts making inappropriate jokes that are making some people uncomfortable. Do you...",
//     options: 
//     [
//         { text: "Ignore them, they're drunk and don't mean it", impact: -1 },
//         { text: "Change the topic", impact: 1 },
//         { text: "Call them out for their inappropriate jokes", impact: 0 }
//     ]
// }
  // More scenes ? Maybe 4-6?
];

// Display the current scene!
function displayScene()
{
    loadScene();
}

// Once user decides, show the feedback based off of their choice
function makeChoice(choice) 
{
    // Variables
    let feedbackTitle = document.getElementById('feedbackTitle');
    let feedbackText = document.getElementById('feedbackText');
    let storyText = document.getElementById('storyText');
    let buttonContainer = document.getElementById('buttonContainer');
    let feedbackContainer = document.getElementById('feedbackContainer');

    // Hide the scenario story and buttons but show feedback
    storyText.style.display = 'none';
    buttonContainer.style.display = 'none';
    feedbackContainer.style.display = 'block';

    // Get the feedback for the current scene and choice
    let feedback = feedbackData[currentScene][choice];
    feedbackTitle.innerHTML = feedback.title;
    feedbackText.innerHTML = feedback.text;

    // Update "score"
    let impact = scenarios[currentScene].options[choice - 1].impact;
    score += impact;
}

// Once feedback is given, user proceeds to next scene
function goToNextScene()
{
    let feedbackContainer = document.getElementById('feedbackContainer');

    // Hide feedback again
    feedbackContainer.style.display = 'none';

    currentScene++;

    // If there's more scenarios, keep showing em
    if (currentScene < scenarios.length)
    { 
        loadScene();
    }
    else // Game over! Show results
    {
        // Variables
        let storyText = document.getElementById('storyText');
        // let scoreText = document.getElementById('score');
        let buttonContainer = document.getElementById('buttonContainer');
        let replayButton = document.getElementById('replayButton');

        // End game screen
        if(score < -1 ) // Ignorance options
        {
            storyText.innerHTML = "<span style='font-size:2em;'>😔 Uh Oh... 😔</span><br><br>You ignored people in need and chose not to get involved. Try be more involved in the future!<br>Who knows,you may be in one of these scenarios and need someone to help!";
        }
        else if (score >= -1 && score <= 1) // Tried to help option
        {
            storyText.innerHTML = "<span style='font-size:2em;'>😬 It's Okay! 😬</span><br><br>While you have good intentions of helping, it also puts you in harms way. You getting hurt isn't peaceful! I hope you've learned how to handle these situations better.";
        }
        else if(score > 2)// Best option
        {
            storyText.innerHTML = "<span style='font-size:2em;'>😇 Peace Warrior 😇</span><br><br>Look at you go, you smart cookie! You chose the best options which resolves the scenario and keeps you out of harms way. Well done!"
        }

        // Show score
        // scoreText.innerHTML = score;
        
        // Show text, hide buttons
        storyText.style.display = 'inline';
        storyImage.style.display ='none';
        buttonContainer.style.display = 'none';
        replayButton.style.display = 'inline';
    }
}

function loadScene()
{
    // Variables
    let storyText = document.getElementById('storyText');
    let buttonContainer = document.getElementById('buttonContainer');
    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');
    let option3 = document.getElementById('option3');
    const storyImage = document.getElementById('storyImage');

    // Show story text and buttons
    storyText.style.display = 'block';
    buttonContainer.style.display = 'block';

    // Update story and choices for this scene
    let currentScenario = scenarios[currentScene];
    storyText.innerHTML = currentScenario.text;

    // Update image to match scenario
    if (currentScene === 0)
    {
        storyImage.src = 'assets/imgs/dogScenario.png'
    }
    else if (currentScene === 1)
    {
        storyImage.src = 'assets/imgs/argueScenario.png'
    }
    else if (currentScene === 2)
    {
        storyImage.src = 'assets/imgs/mediaScenario.png'
    }

        option1.innerHTML = currentScenario.options[0].text;
        option2.innerHTML = currentScenario.options[1].text;
        option3.innerHTML = currentScenario.options[2].text;
}

function replayGame()
{
    // Hide replay button
    replayButton.style.display = 'none';
    storyImage.style.display ='inline';

    // Reset score + hide
    // let scoreText = document.getElementById('score');
    // scoreText.innerHTML = "";
    score = 0;

    // Reset scenes
    currentScene = 0;

    // Go again!
    loadScene();
}

window.onload = displayScene;
