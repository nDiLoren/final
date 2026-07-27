/*
    Nicolas DiLorenzo - July 26 2026

    Script shows cyclable list of images with appropriate captions based on 
    input from prompt.
    Background and image index changes per chosen cat.
*/
"use strict";

//Link to html variables
const photoElement = document.querySelector("#photos");
const captionElement = document.querySelector("#caption");
const titleElement = document.querySelector("#title");
const nextButton = document.querySelector("#next");
const previousButton = document.querySelector("#previous");

let currentPhoto = 0;

const leoImages = [
    {
        src: "images/leo1.jpg",
        alt: "Leo curious",
        title: "Leo looking at birds"
    },
    {
        src: "images/leo2.jpg",
        alt: "Leo sleeping",
        title: "Leo sleeping with his paws out"
    },
    {
        src: "images/leo3.jpg",
        alt: "Leo in jail",
        title: "Leo in jail"
    }
];
const lunaImages = [
    {
        src: "images/luna1.jpg",
        alt: "Luna lap",
        title: "Luna sitting on my lap"
    },
    {
        src: "images/luna2.jpg",
        alt: "Luna laundry",
        title: "Luna not letting me finish laundry"
    },
    {
        src: "images/luna3.jpg",
        alt: "Luna sleep",
        title: "Luna's tooth showing while she sleeps"
    },
    {
        src: "images/luna4.jpg",
        alt: "Luna cute",
        title: "Luna being cute"
    }
];

const finalImages = [
    {
        src: "images/final1.jpg",
        alt: "Cat bed",
        title: "Leo and Luna on the cat bed"
    },
    {
        src: "images/final2.jpg",
        alt: "Cats on bed",
        title: "Leo and Luna on the bed"
    },
    {
        src: "images/final3.jpg",
        alt: "Cats on couch",
        title: "Leo and Luna sharing the couch"
    }
];

const finalLength = finalImages.length;

const catColors = 
{
    leo: 
    {
        color: '#8a6829',
    },
    luna: 
    {
        color: '#050505',
    },
    final: 
    {
        color: '#11001d',
    },
}

/* 
    Prompt to ask to see picture of Leo or Luna
    Convert the string to lowercase, if the name is not leo or luna continue
*/
let chosenCat = "";
while (chosenCat.toLowerCase() !== "leo" && chosenCat.toLowerCase() !== "luna")
{
    chosenCat = prompt(`Would you like to see pictures of Leo or of Luna`);
}

/*
    Update the image and text on screen

*/
function updatePage(photo, index)
{
    photoElement.src = photo.src;
    photoElement.alt = photo.alt;
    captionElement.textContent = photo.title;

    // Show which image in the gallery that's being shown
    titleElement.textContent = `Image ${currentPhoto + 1} of ${getImageCount(chosenCat) + finalLength}`;
}

/*
    Load proper image set based on which cat is chosen by the user
    Update text and image based on index in the list
    Change background color based on cat chosen using catColors
*/
function showImage(index) 
{
    let photo = "";
    switch (chosenCat)
    {
        case "leo":
            photo = leoImages[index];
            document.body.style.backgroundColor = catColors.leo.color;
            break;
        case "luna":
            photo = lunaImages[index];
            document.body.style.backgroundColor = catColors.luna.color;
            break;

        // Default should never be called due to while loop, but is here for failsafe
        default:
            photo = leoImages[index];
            break;
    }

    updatePage(photo, index);
}

/*
    Show final set of images after chosen cat
*/
function showFinalImage(index) 
{
    let photo = finalImages[index];
    document.body.style.backgroundColor = catColors.final.color;

    updatePage(photo, getImageCount(chosenCat) + finalLength);
}

/*
    Get the number of images in each set based on chosen cat
*/
function getImageCount(photo)
{
    switch (photo)
    {
        case "leo":
            return leoImages.length;
            break;
        case "luna":
            return lunaImages.length;
            break;
        case "final":
            return finalImages.length;
            break;
        
        default:
            return leoImages.length;
            break;
    }
}

showImage(currentPhoto);

/*
    Increment currentPhoto and show image in list based on it
    If on last image of chosen cat, switch to final image set
    If on last image of final image set, switch to first image of chosen cat
*/
function showNextImage()
{
    currentPhoto++;
    if (currentPhoto >= getImageCount(chosenCat) + finalLength)
    {
        currentPhoto = 0;
        showImage(currentPhoto);
    }
    else if (currentPhoto >= getImageCount(chosenCat))
    {
        console.log(currentPhoto);
        showFinalImage(currentPhoto - getImageCount(chosenCat));
    }
    else
    {
        showImage(currentPhoto);
    }
}

/*
    Lower currentPhoto and show image in list based on it
    If on first image, alert with cannot go back anymore
*/
function showPreviousImage()
{
    if (currentPhoto <= 0)
    {
        alert("Cannot go back anymore, click next.")
        return;
    }
    currentPhoto--;
    
    if (currentPhoto >= getImageCount(chosenCat))
    {
        showFinalImage(currentPhoto - getImageCount(chosenCat));
    }
    else
    {
        showImage(currentPhoto);
    }
}showImage(currentPhoto);

/*
    Event listeners for clicking buttons
*/
nextButton.addEventListener("click", showNextImage);
previousButton.addEventListener("click", showPreviousImage);