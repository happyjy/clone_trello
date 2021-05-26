const $card_items = document.querySelectorAll('.card_item');
const $descriptionEditBtn = document.querySelector('#descriptionEditBtn');
const $description_edit_textarea = document.querySelector('#description_edit_textarea');

const $addCard = document.querySelectorAll('.addCard');
const $action = document.querySelectorAll('.action');

$card_items.forEach((card_item, _) => {
  card_item.onclick = () => {
    const clickCardItem = (function () {
      const $modalContainer = document.querySelector(".modal_overlay");
      
      return () => {
        $modalContainer.style.display = 'flex';
        // $modalContainer.classList.toggle('modal_open');
      }
    })();
  
    console.log("### card_item");
    clickCardItem();
  }
})

document.querySelector('.content_container').onclick = ((event) => {
  // console.log("# event, this: ", event, event.target, event.currentTarget);

  const target = event.target;

  // const clickCardItem = (function () {
  //   const $modalContainer = document.querySelector(".modal_overlay");
    
  //   return () => {
  //     $modalContainer.style.display = 'block';
  //     // $modalContainer.classList.toggle('modal_open');
  //   }
  // })()

  // // console.log("### target: ", event);
  // if(target.classList.contains("card_item")){
  //   console.log("### card_item");
  //   clickCardItem();
  // }

});

document.querySelector(".modal_overlay").onclick = ((event) => {
  const target = event.target;
  const currentTarget = event.currentTarget;

  console.log(target, currentTarget);
  if(target.classList.contains("modal_overlay")){
    target.style.display = 'none';
  }
})



  

// (function () {
//   const card_item = document.querySelectorAll("");

//   return 

// })()


// window.onload = function () {
// }



/* 
  # Description
*/
descriptionEditBtn.onclick = (event) => {
 console.log("### descriptionEditBtn");
 const click = (function(){
    const $modal_content_description_main_display = document.querySelector(".modal_content_description_main_display");
    const $description_edit = document.querySelector(".description_edit");
    const $description_edit_textarea = document.querySelector("#description_edit_textarea");
    return () => {
      $modal_content_description_main_display.style.display = 'none';
      $description_edit.style.display = 'block';
      $description_edit_textarea.focus();
    }
  })();

  click();
}

description_edit_textarea.onblur = (event) => {
  console.log("### descriptionEditBtn > onfocusout");
  const click = (function(){
     const $modal_content_description_main_display = document.querySelector(".modal_content_description_main_display");
     const $description_edit = document.querySelector(".description_edit");

     return () => {
       $modal_content_description_main_display.style.display = 'block';
       $description_edit.style.display = 'none';
       $modal_content_description_main_display.querySelector("p").innerText = event.target.value;
     }
   })();
 
   click();
}

/* 
  # sidebar addCard, ACTION 클릭시 dropdow layer
*/
/* 
  1. create dropdown Layer container 
  2. create dropdown layer content each button
  3. position when click
  */
// const dropdownLayer = (() => {
//   //  1. create dropdown Layer container 
//   const $dropdownLayerContainer = document.createElement("div");
//   $dropdownLayerContainer.style.cssText = `
//     width: 100px;
//     height: 100px;
//     background-color: blue;
//   `
//   console.log($dropdownLayerContainer);
//   //  2. create dropdown layer content each button
//   $dropdownLayerContainer.innerText = "테스트";
  
//   return (event) => {
//     console.log(event);
//     return $dropdownLayerContainer;
//   }
// })();

$addCard.forEach((el, _) =>{
  //  3. position when click
  el.onclick = (() => {
    //  1. create dropdown Layer container 
    const $dropdownLayerContainer = document.createElement("div");
    $dropdownLayerContainer.style.cssText = `
      width: 100px;
      height: 100px;
      background-color: blue;
    `
    console.log($dropdownLayerContainer);
    //  2. create dropdown layer content each button
    $dropdownLayerContainer.innerText = "테스트";
    
    return (event) => {
      const target = event.target;
      const targetWidth = event.target.getBoundingClientRect().width;
      const targetHeight = event.target.getBoundingClientRect().height;

      target.style.cssText = `
        position: relative;
      `
      $dropdownLayerContainer.style.position = 'absolute';
      $dropdownLayerContainer.style.top = `${targetHeight+5}px`;
      $dropdownLayerContainer.style.left = 0 + "px";
      $dropdownLayerContainer.style.width = targetWidth+"px";
      $dropdownLayerContainer.style.borderRadius = 3+"px";
      target.appendChild($dropdownLayerContainer);

      // return $dropdownLayerContainer;
    }
  })();
})
$action.forEach((el, _) =>{
  //  3. position when click

}) 