var story;
function getStory(name) {
  return {
    currentScene: "mission",
    mission: {
      title: "Life can change!",
      story: `Ah, yes! ${name}. I knew that. *cough* 
      <br> 
      ${name} didn't know what to do with their life, and so stumbled on to the web to find their own destiny. 
      <br>
      <br>
      After hours of scrolling and batting away 5 Minute Crafts video's and top 10 lists they received an email by a mysterious person asking them to click a link to a website... Will you click this link?`,
      choices: [
        {
          choice: "Yes, seems harmless!",
          destination: 'battle'
        },
        {
          choice: "No! Mama told me better than that.",
          destination: 'no1'
        }
      ]
    },
    battle: {
      title: 'Uh are you sure?...',
      story: `Not going to lie. Not really your brightest moment, ${name}, clicking strange links, but sure. Your destiny and all that. Anyways...
      <br>
      <br>
              They finally found a website that seemed to be useful in their pursuit! An all black screen with one singular question and a "Yes" and "No" button popped up. Sounds totally legit to me.
      <br>
      <br>
      <i>Do you want to be part of a super secret underground organisation of really useful people?</i>`,
      choices: [
        {
        choice: "Press Yes",
        destination: 'win'
        },
        {
        choice: "Press No",
        destination: 'noChange'
        }
      ]
    },
    no1: {
        title: "Life can change!",
        story: `Yeah, no, just press the button. This isn't really that kind of story.`,
        choices: [
          {
            choice: "Yes, seems harmless!",
            destination: 'battle'
          },
          {
            choice: "No! Mama told me better than that.",
            destination: 'no2'
          }
        ]
    },
    no2: {
        title: "Why.",
        story: `Dude, please? I'm trying to code a game for the first time.`,
        choices: [
          {
            choice: "Yes, seems harmless!",
            destination: 'battle'
          }
        ]
      },
    win: {
        title: "You win at life!",
        story: `WOW! Super mega important guys knocked on ${name}'s door to hand them the key to the city and gave them a job at the super secret underground organisation of really useful people! It seems ${name} has finally found a purpose in life. Well done ${name}.`,
        defaultDestination: 'mission',
        buttonText: "Want to try this again?"
    },
    noChange: {
        title: "Life didn't change at all.",
        story: `${name} wasn't interested in whatever these strange people were offering and so clicked off the website. They will never know what would have been in store for them if they clicked yes and so their life continued as it always has been.`,
        defaultDestination: 'mission',
        buttonText: "Want to try this again?"
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('#start-button')
  var content = document.querySelector('#content')
  button.addEventListener('click', function() {
    var name = document.querySelector('#name-input')
    story = getStory(name.value)
    renderScene()
  })
})

function renderScene() {
  var text = "Next"
  var image = "";
  if (story[story.currentScene].image) {
    image = "<img></img>"
  }
  if (story[story.currentScene].buttonText) {
    text = story[story.currentScene].buttonText
  }
  content.innerHTML = `
  <h1>${story[story.currentScene].title}</h1>
  <p>${story[story.currentScene].story}</p>
  ${image}
  ${getInputs()}
  <button id = "submit-button">${text}</button>
  `
  if (story[story.currentScene].image) {
    document.querySelector("img").src = `./img/${story[story.currentScene].image}`
  }
  var button = document.querySelector("#submit-button");
  button.addEventListener('click', function() {
    getInputValue()
  })
}

function getInputValue() {
  var inputs = document.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      story.currentScene = inputs[i].getAttribute('data-destination')
      renderScene();
      return;
    }
  }
  story.currentScene = story[story.currentScene].defaultDestination
  renderScene()
}

function getInputs() {
  var input = ""
  if (!story[story.currentScene].choices) {
    return ""
  }
  for(var i = 0; i < story[story.currentScene].choices.length; i++) {
    input += `
    <div>
      <input data-destination = ${story[story.currentScene].choices[i].destination} id = "radio${i}" type = "radio" name = "choices" />
      <label for "radio${i}">${story[story.currentScene].choices[i].choice}</label>
    </div>`
  }
  return input;
}