const $card_items = document.querySelectorAll('.card_item');

$card_items.forEach((card_item, _) => {
  card_item.onclick = () => {
    const clickCardItem = (function () {
      const $modalContainer = document.querySelector(".modal_overlay");
      
      return () => {
        debugger;
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
  //     debugger;
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