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
        $modalContainer.style.cssText = `
          display: flex;
          justify-content: center;
          align-items: center;
        `
      }
    })();
  
    console.log("### card_item");
    clickCardItem();
  }
})

document.querySelector('.content_container').onclick = ((e) => {
  // console.log("# event, this: ", event, event.target, event.currentTarget);

  const target = e.target;

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


/**
 * ## modal window
 *    
 */
document.querySelector(".modal_overlay").onclick = ((e) => {
  const target = e.target;
  const currentTarget = e.currentTarget;

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

document.querySelector("#modal_close").onclick=((target)=>{
  const triggerFn = (() => {
    const modalOverlay = document.querySelector(".modal_overlay");
  
    return () => {
      // debugger;
      modalOverlay.style.display = 'none';
    }
  })();

  triggerFn();
})
// (function () {
//   const card_item = document.querySelectorAll("");
//   return 
// })()
// window.onload = function () {
// }


/**
 * # Description
 */
descriptionEditBtn.onclick = (e) => {
 console.log("### descriptionEditBtn");
 const triggerFn = (function(){
    const $modal_content_description_main_display = document.querySelector(".modal_content_description_main_display");
    const $description_edit = document.querySelector(".description_edit");
    const $description_edit_textarea = document.querySelector("#description_edit_textarea");
    return () => {
      $modal_content_description_main_display.style.display = 'none';
      $description_edit.style.display = 'block';
      $description_edit_textarea.focus();
    }
  })();

  triggerFn();
}

description_edit_textarea.onblur = (e) => {
  console.log("### descriptionEditBtn > onfocusout");
  const triggerFn = (function(){
     const $modal_content_description_main_display = document.querySelector(".modal_content_description_main_display");
     const $description_edit = document.querySelector(".description_edit");

     return () => {
       $modal_content_description_main_display.style.display = 'block';
       $description_edit.style.display = 'none';
       $modal_content_description_main_display.querySelector("p").innerText = e.target.value;
     }
   })();
 
   triggerFn();
}

/**
 *  # sidebar addCard, ACTION 클릭시 dropdow layer 
 * 
 *  # 전략
 *   1. create dropdown Layer container 
 *   2. create dropdown layer content each button
 *   3. position when click
 * 
 */

/**
 * ## 고민
 *   * 2가지 방법 고민
 *     * 클릭한 button container에 넣는것과
 *     * body tag 안에 특정 부분에 dropdown을 append 하는 방법
 *   * dropdown layer 제거 할때 고민. 
 *     * dropdown layer 영역이 아닐 때 제거 해야 한다. 
 *     * 클릭 이벤트가 일어날때 dropdown layer가 있는 것을 확인 후 제거한다.  
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

  const config = {dropdownLayerContainerSelector, config: {data, options: { simpleSearch: true}}}
  const labelComponentInst = new LabelComponent(config);
// 
  return labelComponentInst;
}

const dropdownLayerCbFn = (() => {
  const $dropdownLayer = document.createElement("div");
  
  return (e) => {
    // if(event.target === previouseTraget) return;
    const target = e.target;
    const datasetTitle = target.dataset.title;
    const targetBoundingRect = e.target.getBoundingClientRect();
    const targetWidth = targetBoundingRect.width;
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

    this.LabelUiComponent = createLabelUiComponent();
    // debugger;

    const $dropdownLayerComponent = this.LabelUiComponent.$dropdownLayer;
    $dropdownLayerComponent.style.width = targetWidth+100+"px";
    $dropdownLayerComponent.style.top = `${targetBottom+5}px`;
    $dropdownLayerComponent.style.left = `${targetLeft}px`
    $dropdownLayerComponent.dataset.title = datasetTitle;
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
document.body.addEventListener('click', (e)=>{
  console.log("## body click event");
  
  let target = e.target;
  while(target && target.classList &&target.parentNode!=="BODY"){
    // if(!target.parentNode) return;
    if(target.classList.contains("dropdownLayer")) return     
    target = target.parentNode;
  }
  
  /**
   * dropdown Layer 제거
   */
  const $dropdownLayerList = document.querySelectorAll(".dropdownLayer");
  $dropdownLayerList?.forEach(el => {
    if(clickedDropdownLayer) {
      clickedDropdownLayer = !clickedDropdownLayer;
      // if(el.dataset.title === event.target.dataset.title) el.remove();
      return;
    }
    el.remove();
  })

  previouseTraget = e.target;
})

/* 
  [] dropdown layer 밖영역 클릭시 layer 우선 제거 
  [] dropdown layer열린상태에서 modal overlay 클릭시 dropdown layer 우선 제거 
    ㄴ[] dropdown layer 닫힌 상태에서 다시 클릭시 modal 닫히기
*/

/**
 * body keyup event
 */
document.body.addEventListener('keyup', (e)=>{
  console.log("body > keypress", e);
  const {target} = e;
  
  const triggerFn = (() => {
    const modalOverlay = document.querySelector(".modal_overlay");
    
  
    return () => {
      // debugger;
      if (e.key == "Escape") {
        modalOverlay.style.display = 'none';
      }
    }
  })();

  triggerFn();
  
});


/**
 * # drag & drop
 * 
 * ## 문제 outerEl에만 drap, drop 이벤트를 잡으니 innerEl에 drop하니 이벤트를 감지 하지 못한다.
 */
// document.querySelectorAll("div.card_item:not(.add_card_item)")
document.querySelectorAll(".card_contents_container").forEach((el, i) => {
  [...el.children].forEach((el,i) => {
    if(el.classList.contains("add_card_item")) return;
    el.dataset.index = i;
  });
})
document.querySelectorAll(".card_container").forEach( el => {
  el.ondrop = drop;
  el.ondragover = allowDrop;
  el.ondragstart = drag;
});
document.querySelectorAll(".card_item").forEach( el => {
  el.setAttribute("draggable", true);
})

function drag(event) {
  const {target} = event;
  const targetClass = target.classList;

  // if(targetClass.contains("card_item_text")){
  if(targetClass.contains("card_item")){
    console.log("# drag");
    // const dragRandomNum = `R-${+new Date()}`
    // event.target.classList.add(dragRandomNum);
    event.dataTransfer.setData("dragOuterHTML", event.target.outerHTML);
    event.dataTransfer.setData("dragIndex", event.target.dataset.index);
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.dropAllowed = "move"
  }
};
function drop(event) {
  const {target} = event;
  const targetClass = target.classList;

  if(targetClass.contains("card_item") || targetClass.contains("card_item_text")){
    console.log("# drop");
    const parentNode = event.target.parentNode;
    const dropIndex = target.dataset.index;
    const dragOuterHTML = event.dataTransfer.getData("dragOuterHTML");
    const dragIndex = event.dataTransfer.getData("dragIndex");

    // add drop el에 drag el
    const $div = document.createElement("div")
    $div.innerHTML = dragOuterHTML;
    $div.childNodes[0].dataset.index = dropIndex;
    event.target.outerHTML = $div.childNodes[0].outerHTML;

    // replace drop el 자리에 drag el
    event.target.dataset.index = dragIndex;
    parentNode.replaceChild(event.target , parentNode.querySelector(`div[data-index='${dragIndex}']`))
    
    event.stopPropagation();
    event.preventDefault();
  } 
}
function allowDrop(event) {
  const {target} = event;
  const targetClass = target.classList;

  if(targetClass.contains("card_item") || targetClass.contains("card_item_text")){
    console.log("# allowDrop");
    event.stopPropagation();
    event.preventDefault();
  } 
}