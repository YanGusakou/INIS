/*
* all the code for laboratory work 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const draggableElements = document.querySelectorAll('.target');
const workSpace = document.querySelector('#workspace');
let positionX;
let positionY;
let escFunction;
let zoom = null;
let terr = true;
let touchPositionX;
let touchPositionY;
let position = false;
let element;

for (let i = 0; i < draggableElements.length; i++) {
  draggableElements[i].draggable = true;

  workspace.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  workspace.addEventListener("drop", () => {
    drop = true;
  });

  draggableElements[i].addEventListener('dragend', (e) => {
    if (drop) {
      draggableElements[i].style.top = e.pageY - positionY + 'px';
      draggableElements[i].style.left = e.pageX - positionX + 'px';
      drop = false;
    }
  })
  draggableElements[i].addEventListener('dragstart', (e) => {
    positionX = e.offsetX;
    positionY = e.offsetY;
  })


  draggableElements[i].addEventListener('click', (e) => {
    e.stopPropagation();
    workSpace.onmousemove = null;
    for (let j = 0; j < draggableElements.length; ++j) {
      if (j == i)
        draggableElements[j].style.background = 'blue';
      else
        draggableElements[j].style.background = 'red';
    }
  })

  workSpace.addEventListener('click', (e) => {
    workSpace.ontouchmove = null;
    draggableElements[i].style.background = 'red';
  })

  draggableElements[i].addEventListener('dblclick', (e) => {
    positionX = e.offsetX;
    positionY = e.offsetY;
    workSpace.onmousemove = (e) => {
      draggableElements[i].style.top = e.pageY - positionY + 'px';
      draggableElements[i].style.left = e.pageX - positionX + 'px';
    }
  })

  draggableElements[i].addEventListener('touchmove', (e) => {
    var touch1 = e.targetTouches[0];
    var touch2 = e.targetTouches[1];
    var touch3 = e.targetTouches[2];

    if (touch1) {
      console.log("1 touch");
      if (touch2 && terr) {
        console.log("2 touch");
        const scale = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
        if (zoom) {
          draggableElements[i].style.transform = "scale(" + Math.abs(scale / zoom) + ")";
        }
        else {
          zoom = scale;
        }
        if (touch3) {
          console.log("3 touch");
          draggableElements[i].style.transform = "scale(1)";
        }
      }
      else {
        if (!position) {
          console.log("position=" + position);
          element = draggableElements[i];
          touchPositionX = draggableElements[i].style.left;
          touchPositionY = draggableElements[i].style.top;
          position = true;
        }
        draggableElements[i].style.top = e.targetTouches[0].pageY - draggableElements[i].offsetHeight / 2 + 'px';
        draggableElements[i].style.left = e.targetTouches[0].pageX - draggableElements[i].offsetWidth / 2 + 'px';
      }
    }
  })

  draggableElements[i].addEventListener('touchstart', (e) => {
    if (e.target.style.background == 'blue') {
      workSpace.ontouchmove = (e) => {
        draggableElements[i].style.top = e.targetTouches[0].pageY - draggableElements[i].offsetHeight / 2 + 'px';
        draggableElements[i].style.left = e.targetTouches[0].pageX - draggableElements[i].offsetWidth / 2 + 'px';
      }
    }
  }
  )

  draggableElements[i].addEventListener('touchend', (e) => {
    console.log("Touch end!");
    if (e.targetTouches.length == 2) {
      terr = false;
      workSpace.ontouchmove = null;
    }
    else {
      terr = true;
    }
    position = false;
    console.log(terr);
  })

  workspace.addEventListener('touchstart', (e) => {
    if (position) {
      console.log("position=" + position);
      element.style.top = touchPositionY;
      element.style.left = touchPositionX;
      position = false;
      e.targetTouches[0] = null;
      e.targetTouches[1] = null;
      console.log(e.targetTouches.length);
    }
  })

}
