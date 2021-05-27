let clickedDropdownLayer = false;
let previouseTraget;
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

  // console.log(target, currentTarget);
  if(target.classList.contains("modal_overlay")){
    const $dropdownLayerContainer = document.querySelector("#dropdownLayerContainer");

    // modal_overlay 제거하기 전에 dropdownLayer가 있다면 layer우선 제거(modal-window 닫히지 않음)
    if($dropdownLayerContainer.hasChildNodes()){
      $dropdownLayerContainer.innerHTML ='';
      return;
    }

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

/* 
  ## 고민
    * 2가지 방법 고민
      * 클릭한 button container에 넣는것과
      * body tag 안에 특정 부분에 dropdown을 append 하는 방법
    * dropdown layer 제거 할때 고민. 
      * dropdown layer 영역이 아닐 때 제거 해야 한다. 
      * 클릭 이벤트가 일어날때 dropdown layer가 있는 것을 확인 후 제거한다.  
*/
const createLabelUiComponent = () => {
  const $dropdownLayerContainer = document.querySelector("#dropdownLayerContainer")
  const dropdownLayerContainerSelector = "#dropdownLayerContainer"

  const data = [
    {index: 1, color: "green", label: "green_tag!!!"},
    {index: 2, color: "yellow", label: "yellow_tag!!!"},
    {index: 3, color: "scarlet", label: "scarlet_tag!!!"},
    {index: 4, color: "red", label: "red_tag!!!"},
    {index: 5, color: "purple", label: "purple_tag!!!"},
  ]

  const config = {dropdownLayerContainerSelector, data}
  const labelUiInstance = new labelUi(config);

  return labelUiInstance;
}

const dropdownLayerCbFn = (() => {
  //  1. create dropdown Layer container 
  const $dropdownLayer = document.createElement("div");
  $dropdownLayer.classList.add("dropdownLayer")
  $dropdownLayer.style.cssText = `
    min-height: 100px;
    background-color: #fff;
    border-radius: 3px;
    color: #172b4d;
    padding: 5px;
    position: absolute;
    z-index: 2000;
  `;
  //  2. create dropdown layer content each button
  // $dropdownLayer.innerText = "테스트";
  // console.log($dropdownLayer);
  const $label = `
    <div class="dl_title_container">
      <span class="dl_title">Label</span>
      <span>
        <i class="fa fa-times" aria-hidden="true"></i>
      </span>
    </div>
    <div class="dl_search_container">
      <input id="dl_search_input" type="text" placeholder="Search labels...">
    </div>
    <div class="dl_labels_container">
      <div class="dl_label_title">
        <label>LABELS</label>
      </div>
      <div class="dl_label_item_container">
        <label class="dl_label_item">태그1</label>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>
      <div class="dl_label_item_container">
        <label class="dl_label_item">태그2</label>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>
      <div class="dl_label_item_container">
        <label class="dl_label_item">태그3</label>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>
      <div class="dl_label_item_container">
        <label class="dl_label_item">태그4</label>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>
      <div class="dl_label_item_container">
        <label class="dl_label_item">태그5</label>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>
    </div>
    <div class="dl_add_label_container">
      <input id="dl_add_label_input" type="text" placeholder="add labels...">
    </div>
    `
  $dropdownLayer.innerHTML = $label;
  
  return (event) => {
    // if(event.target === previouseTraget) return;
    const target = event.target;
    const datasetTitle = target.dataset.title;
    const targetBoundingRect = event.target.getBoundingClientRect();
    const targetWidth = targetBoundingRect.width;
    const targetHeight = targetBoundingRect.height;
    const targetBottom = targetBoundingRect.bottom;
    const targetLeft = targetBoundingRect.left;


    clickedDropdownLayer = true;
    const $dropdownLayerContainer = document.querySelector("#dropdownLayerContainer")
    if($dropdownLayerContainer.hasChildNodes()){
      if([...$dropdownLayerContainer.children].some(v => v.dataset.title === datasetTitle)) {
        $dropdownLayerContainer.innerHTML ='';
        return;
      }
    }
    
    const LabelUiComponent = createLabelUiComponent();
    const $dropdownLayerComponent = LabelUiComponent.$dropdownLayer;
    $dropdownLayerComponent.style.width = targetWidth+100+"px";
    $dropdownLayerComponent.style.top = `${targetBottom+5}px`;
    $dropdownLayerComponent.style.left = `${targetLeft}px`
    $dropdownLayerComponent.dataset.title = datasetTitle;

    // $dropdownLayer.style.width = targetWidth+100+"px";
    // $dropdownLayer.style.top = `${targetBottom+5}px`;
    // $dropdownLayer.style.left = `${targetLeft}px`
    // $dropdownLayer.dataset.title = datasetTitle;

    /* target child에 붙일때 */
    // target.style.cssText = `
    //   position: relative;
    // `
    // $dropdownLayerContainer.style.top = `${targetHeight+5}px`;
    // $dropdownLayerContainer.style.left = 0 + "px";
    /* dropdownLayer 전용 dom에 붙일 때 */
    
    // target.appendChild($dropdownLayerContainer);
 
    // $dropdownLayerContainer.appendChild($dropdownLayer);

    // clickedDropdownLayer = true;
    // const $dropdownLayer = document.querySelector("#dropdownLayer")
    // if($dropdownLayer.hasChildNodes()){
    //   if([...$dropdownLayer.children].some(v => v.dataset.title === datasetTitle)) return;
    //   $dropdownLayer.innerHTML ='';
    //   $dropdownLayer.appendChild($dropdownLayerContainer);

    //   // [...$dropdownLayer.children].forEach((dropdownLayerEl,i)=>{
    //   //   if(dropdownLayerEl.dataset.title === datasetTitle){
    //   //     dropdownLayerEl.remove();
    //   //     return;
    //   //   } 
    //   //   $dropdownLayer.appendChild($dropdownLayerContainer);
    //   // })
    // } else {
    //   $dropdownLayer.appendChild($dropdownLayerContainer);
    // }
  }
})();

$addCard.forEach((el, _) =>{
  //  3. position when click
  el.onclick = dropdownLayerCbFn;
})
$action.forEach((el, _) =>{
  //  3. position when click
  el.onclick = dropdownLayerCbFn;
}) 

// document.getElementsByTagName("body").onclick = function(event){
//   console.log("## body");;
// }
document.body.addEventListener('click', (event)=>{
  console.log("## body");
  const $dropdownLayerList = document.querySelectorAll(".dropdownLayer");
  let target = event.target;
  while(target && target.classList &&target.parentNode!=="BODY"){
    // if(!target.parentNode) return;
    if(target.classList.contains("dropdownLayer")) return     
    target = target.parentNode;
  }

  $dropdownLayerList?.forEach(el => {
    if(clickedDropdownLayer) {
      clickedDropdownLayer = !clickedDropdownLayer;
      // if(el.dataset.title === event.target.dataset.title) el.remove();
      return;
    }
    el.remove();
  })

  previouseTraget = event.target;
})

/* 
  [] dropdown layer 밖영역 클릭시 layer 우선 제거 
  [] dropdown layer열린상태에서 modal overlay 클릭시 dropdown layer 우선 제거 
    ㄴ[] dropdown layer 닫힌 상태에서 다시 클릭시 modal 닫히기
*/