let clickedDropdownLayer = false;
let previouseTraget;
const $card_items = document.querySelectorAll('.card_item');
const $descriptionEditBtn = document.querySelector('#descriptionEditBtn');
const $description_edit_textarea = document.querySelector('#description_edit_textarea');
const $addCard = document.querySelectorAll('.addCard');
const $action = document.querySelectorAll('.action');

/**
 * # modal window
 */
const fetchReplyFn = (() => {
  let page = 0;
  const $modalFetchMoreLoading = document.querySelector('#modal_fetchMore_loading');
  const $modalContentActivityReplyContainer = document.querySelector('.modal_content_activity_reply_container');

  return async () => {
    const LoadingTarget = page ? $modalContentActivityReplyContainer : $modalFetchMoreLoading;
    LoadingTarget.classList.add("fetchLoading");
    $modalContentActivityReplyContainer.scrollTo(0, $modalContentActivityReplyContainer.scrollHeight);
    await renderReply(page++);
    LoadingTarget.classList.remove("fetchLoading");
  }
})();

const renderReply = async (page) => {
  // append reply dom
  // * replyDummyData: network에서 받아온 data
  // 이 데이터를 page 수만큼 자를때 setTimeout으로 시간을 끈다. (promise로 비동기 구현)
  /* 
    ## [REVIEW...] promise와 setTimeout관계에 대해서 설명 해보자.
  */
  const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

  const promiseResult = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getReplyDummyData(page));
      // }, getRandomSeconds())
    }, 2000)
  })

  /* 
    # [IMPORTANT!][REVIEW...] aync-await with promise
      * [async-await with promise - js info](https://javascript.info/async-await#await)
      * promise return value에 await를 붙여야 하는 것을 아래 문서를 참고했다. 
      * 붙이지 않으면 promise안 setTimeout을 기다리지 안고 비동기로 동작한다.
        * promiseResult.then ... 한 경우  
        ```
          // 숫자: call stack excute 순서
          1. LoadingTarget.classList.add("fetchLoading");
          3. await renderReply(page++);
          2. LoadingTarget.classList.remove("fetchLoading");
        ```
        
        * await promiseResult.then ... 한 경우  
        ```
          // 숫자: call stack excute 순서
          1. LoadingTarget.classList.add("fetchLoading");
          2. await renderReply(page++);
          3. LoadingTarget.classList.remove("fetchLoading");
        ```

      * [!] await는 말그대로 promise가 settles될때까지 기다려준다. 
      * [!] 그리고는 promise return 객체를 수행한다.
      * [!] 이때 CPU 리소스가 낭비 되지 안는다. 왜냐하면 JS엔진은 scripts, event를 수행 할 수 있기 때문이다. 
      * [!] 그 증거로 setTimeout에 의해서 loading bar가 보일 때 event handler가 동작하는것을 확인 할 수 있습니다.
  */
  await promiseResult.then((replyDataList) => {
    const $modal_content_activity_reply_container = document.querySelector(".modal_content_activity_reply_container");
    // [...$modal_content_activity_reply_container.children].forEach(v => {
    //   if(v.id !== "modal_fetchMore_loading"){
    //     v.remove();
    //   }
    // })
    // deleteReplyList();

    const frag = document.createDocumentFragment();
    replyDataList.forEach(reply => frag.appendChild(renderReplyTemplate(reply)));

    $modal_content_activity_reply_container.appendChild(frag);
  }) // end: promiseResult


} // end: renderReply

const renderReplyTemplate = ({
  profile,
  writer,
  date,
  reply
}) => {
  const tempDiv = document.createElement("div");
  const replyTemplate = `
  <div class="reply_container">
  <div class="profile_container">
    <div class="profile_name">
      <span class="profile_name_text">${profile}</span>
    </div>
  </div>
  <div class="reply_content_container">
    <div class="reply_content_title">
      <span class="reply_content_title_writer">${writer}</span>
      <span class="reply_content_title_date">${date}</span>
    </div>
    <div class="reply_content">
      <div class="reply_content_box">${reply}</div>
      <div class="reply_content_edit" style="display: none;">
        <textarea name="" id="" cols="30" rows="10">${reply}</textarea>
        <div class="reply_content_edit">
          <div class="reply_content_edit_left">
            <span>save</span>
            <span>X</span>
          </div>
          <div class="reply_content_edit_right">
            <span>icon1</span>
            <span>icon2</span>
            <span>icon3</span>
            <span>icon4</span>
          </div>
        </div>
      </div>
    </div>
    <div class="reply_content_reply_modify_container">
      <span class="reply_edit card_link">edit</span>
      <span class="reply_delete card_link">delete</span>
    </div>
  </div>
  </div>
  `;
  /* 
    ## appendChild, append, insertAdjacentHTML 별 append할 data type
    * appendChild는 append할 data type은 첫번째 인자에 dom객체 넣는다.
    
    * append는 append할 data type은 첫번째 인자에 dom객체 type 또는 string type을 넣는다.
      * [append - mdn](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)
      * append(...nodes Or DOMStrings)
    
    * insertAdjacentHTML는 append할 data type은 두번째 인자에 string type을 넣는다.
      * [insertAdjacentHTML - mdn](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)
      * element.insertAdjacentHTML(position, text);
  */


  /* 
    ## [REVIEW]Element.append(), Node.appendChild() 차이
      [Element.append() - mdn](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)
      * Element.append()에 Node objects, DOMString objects를 dom에 붙일 수 있다. 
        반면, Node.appendChild()에 Node objects만 dom 붙일 수 있다. 
      * Element.append()는 return value가 없다. 
        반면, Node.appendChild()는 붙인 Node object를 반환한다.
      * Element.append()는 여러개의 nodes, strings type을 붙일 수 있다. 
        반면, Node.appendChild()는 하나의 노드만 붙일 수 있다.
  */
  // * replyTemplate dom이 아니라 string type이다. 
  // * appendChild에는 dom객체가 들어가야한다.
  // tempDiv.appendChild(replyTemplate)
  tempDiv.insertAdjacentHTML('beforeend', replyTemplate);
  return tempDiv.firstElementChild;
}

$card_items.forEach((card_item, _) => {
  card_item.onclick = () => {
    // show modal 
    const showModalWindowLayer = (function () {
      const $modalContainer = document.querySelector(".modal_overlay");
      return () => {
        $modalContainer.style.cssText = `
          display: flex;
          justify-content: center;
          align-items: center;
        `
      }
    })();
    showModalWindowLayer();

    // # card render 기능
    // console.log("### replyDummyData: ", replyDummyData);
    // console.log("### replyTemplate: ", replyTemplate);


    // var $fragmentEl = document.createDocumentFragment();
    // $fragmentEl.innerHTML = replyTemplate;
    // $modal_content_activity_reply_container.appendChild(replyTemplate);
    // insertAdjacentElement은 두번째 param에 dom el이 들어가야하는게 그게 안되서 "innerHTML"을 사용

    /* 
      ## [REVIEW...] about dom append
      # What is The Difference Between innerHTML and outerHTML
      # insertAdjacentElement
        [insertAdjacentElement- mdn](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)
      # append 종류 
        * [append 종류 ](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)
        * Element.prepend()
        * Node.appendChild()
        * ChildNode.after()
        * Element.insertAdjacentElement()
        * NodeList
    */
    console.log("### card_item");

    /* 
      ## [REVIEW...] Document - js info
      # [Document - javascript info](https://javascript.info/document)
    */

    // fetch -> laoding -> rendering
    // 1. 첫번째 laoding
    // 2. 스롤롤 끝 도달 -> loading 
    // 3. fetching again
    const replyTemplate = getReplyDummyData().map((v, i) => {
      return `
        <div class="reply_container">
        <div class="profile_container">
          <div class="profile_name">
            <span class="profile_name_text">${v.profile}</span>
          </div>
        </div>
        <div class="reply_content_container">
          <div class="reply_content_title">
            <span class="reply_content_title_writer">${v.writer}</span>
            <span class="reply_content_title_date">${v.date}</span>
          </div>
          <div class="reply_content">
            <div class="reply_content_box">${v.reply}</div>
            <div class="reply_content_edit" style="display: none;">
              <textarea name="" id="" cols="30" rows="10">${v.reply}</textarea>
              <div class="reply_content_edit">
                <div class="reply_content_edit_left">
                  <span>save</span>
                  <span>X</span>
                </div>
                <div class="reply_content_edit_right">
                  <span>icon1</span>
                  <span>icon2</span>
                  <span>icon3</span>
                  <span>icon4</span>
                </div>
              </div>
            </div>
          </div>
          <div class="reply_content_reply_modify_container">
            <span class="reply_edit card_link">edit</span>
            <span class="reply_delete card_link">delete</span>
          </div>
        </div>
        </div>
      `
    }).join("");

    fetchReplyFn();
  }
})

document.querySelector(".modal_overlay").onclick = ((e) => {
  const target = e.target;
  const currentTarget = e.currentTarget;

  // console.log(target, currentTarget);
  if (target.classList.contains("modal_overlay")) {
    const $dropdownLayerContainer = document.querySelector("#dropdownLayerContainer");

    // modal_overlay 제거하기 전에 dropdownLayer가 있다면 layer우선 제거(modal-window 닫히지 않음)
    if ($dropdownLayerContainer.hasChildNodes()) {
      $dropdownLayerContainer.innerHTML = '';
      return;
    }

    target.style.display = 'none';
    deleteReplyList();
  }
})

document.querySelector("#modal_close").onclick = ((target) => {
  const triggerFn = (() => {
    const modalOverlay = document.querySelector(".modal_overlay");

    return () => {
      modalOverlay.style.display = 'none';
      deleteReplyList();
    }
  })();

  triggerFn();
})

const onScroll = (e) => {
  debugger
  /* 
    # [review] size and scroll 
      * [size and scroll - mdn](https://javascript.info/size-and-scroll)
  */
  const {
    clientHeight,
    scrollTop,
    scrollHeight
  } = e.target;
  console.log({
    clientHeight,
    scrollTop,
    scrollHeight
  });
  if (clientHeight + scrollTop === scrollHeight) {
    /* 
      # clientHeight, scrollTop, scrollHeight의 의미
        * clientHeight: 이벤트가 일어난 el의 height(padding 포함, scrollbar 미포함)
        * scrollTop: 스크롤 된 위쪽 부분(이벤트가 일어난 el의 위쪽을 시작 기준)
        * scrollHeight: 이벤트가 일어난 el의 전체 높이(스크롤 될 부분 모두 포함)
    */
    fetchReplyFn();
  }
};


const $modal_content_activity_reply_container = document.querySelector(".modal_content_activity_reply_container")
// ## [!IMPORTANT][REVIEW]throttle: 여러번의 요청중 하나만 요청 받아 수행
$modal_content_activity_reply_container.addEventListener('scroll', throttle(onScroll, 1000));

const deleteReplyList = (() => {
  const $modal_content_activity_reply_container = document.querySelector(".modal_content_activity_reply_container");

  return () => {
    [...$modal_content_activity_reply_container.children].forEach(v => {
      if (v.id !== "modal_fetchMore_loading") {
        v.remove();
      }
    });
  }
})();

/**
 * # Description 기능
 */
descriptionEditBtn.onclick = (e) => {
  console.log("### descriptionEditBtn");
  const triggerFn = (function () {
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
  const triggerFn = (function () {
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
 *  # sidebar addCard, ACTION 클릭시 dropdow layer 기능
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

  const data = [{
      index: 1,
      color: "green",
      label: "green_tag!!!"
    },
    {
      index: 2,
      color: "yellow",
      label: "yellow_tag!!!"
    },
    {
      index: 3,
      color: "scarlet",
      label: "scarlet_tag!!!"
    },
    {
      index: 4,
      color: "red",
      label: "red_tag!!!"
    },
    {
      index: 5,
      color: "purple",
      label: "purple_tag!!!"
    },
  ]

  const config = {
    dropdownLayerContainerSelector,
    config: {
      data,
      options: {
        simpleSearch: true
      }
    }
  }
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
    if ($dropdownLayerContainer.hasChildNodes()) {
      if ([...$dropdownLayerContainer.children].some(v => v.dataset.title === datasetTitle)) {
        $dropdownLayerContainer.innerHTML = '';
        return;
      }
    }

    this.LabelUiComponent = createLabelUiComponent();
    // debugger;

    const $dropdownLayerComponent = this.LabelUiComponent.$dropdownLayer;
    $dropdownLayerComponent.style.width = targetWidth + 100 + "px";
    $dropdownLayerComponent.style.top = `${targetBottom+5}px`;
    $dropdownLayerComponent.style.left = `${targetLeft}px`
    $dropdownLayerComponent.dataset.title = datasetTitle;
  }
})();

$addCard.forEach((el, _) => {
  //  3. position when click
  el.onclick = dropdownLayerCbFn;
})
$action.forEach((el, _) => {
  //  3. position when click
  el.onclick = dropdownLayerCbFn;
})

/**
 * # body click event
 * # dropdown Layer 제거 기능
 */
document.body.addEventListener('click', (e) => {
  let target = e.target;
  while (target && target.classList && target.parentNode !== "BODY") {
    // if(!target.parentNode) return;
    if (target.classList.contains("dropdownLayer")) return
    target = target.parentNode;
  }

  /**
   * dropdown Layer 제거 기능
   */
  const $dropdownLayerList = document.querySelectorAll(".dropdownLayer");
  $dropdownLayerList ? .forEach(el => {
    if (clickedDropdownLayer) {
      clickedDropdownLayer = !clickedDropdownLayer;
      // if(el.dataset.title === event.target.dataset.title) el.remove();
      return;
    }
    el.remove();
  })

  previouseTraget = e.target;
})

/**
 * [x] dropdown layer 밖영역 클릭시 layer 우선 제거 
 * [x] dropdown layer열린상태에서 modal overlay 클릭시 dropdown layer 우선 제거 
 *  ㄴ[x] dropdown layer 닫힌 상태에서 다시 클릭시 modal 닫히기 
 */
/**
 * body keyup event
 */
document.body.addEventListener('keyup', (e) => {
  console.log("body > keypress", e);
  const {
    target
  } = e;

  const triggerFn = (() => {
    const $modalOverlay = document.querySelector(".modal_overlay");
    const $sidenav = document.querySelector(".sidenav")
    const $container = document.querySelector(".container");

    return () => {
      switch (e.key) {
        case "Escape":
          $modalOverlay.style.display = 'none';
          break;
        case "f":
          /**
           * ## sidenav가 생길때 .container margin right가 생길때 card item width도 같이 줄어 들수는 없나? 
           *  * flex관련해서 나중에 알아줘야 할 것같은데...
           */
          const width = "300px";
          if ($sidenav.style.width == width) {
            $sidenav.style.width = "0";
            $sidenav.style.padding = "0px"
            $container.style.marginRight = "0";
          } else {
            $sidenav.style.width = width;
            $sidenav.style.padding = "10px"
            $container.style.marginRight = width;
          }

          break;

        default:
          break;
      }

    }
  })();

  triggerFn();

});


/**
 * # drag & drop 기능
 * 
 * ## 문제 outerEl에만 drap, drop 이벤트를 잡으니 innerEl에 drop하니 이벤트를 감지 하지 못한다.
 */
// document.querySelectorAll("div.card_item:not(.add_card_item)")
document.querySelectorAll(".card_contents_container").forEach((el, i) => {
  el.dataset.index = i;

  [...el.children].forEach((el, i) => {
    if (el.classList.contains("add_card_item")) return;
    el.dataset.index = i;
  });
})
document.querySelectorAll(".card_container").forEach(el => {
  el.ondrop = drop;
  el.ondragover = allowDrop;
  el.ondragstart = drag;
});
document.querySelectorAll(".card_item").forEach(el => {
  el.setAttribute("draggable", true);
})

function drag(event) {
  const {
    target
  } = event;
  const outerEl = target.parentNode;
  const targetClass = target.classList;

  if (targetClass.contains("card_item")) {
    console.log("# drag");
    event.dataTransfer.setData("dragOuterHTML", event.target.outerHTML);
    event.dataTransfer.setData("dragOuterIndex", outerEl.dataset.index);
    event.dataTransfer.setData("dragIndex", event.target.dataset.index);
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.dropAllowed = "move"
  }
};

function drop(event) {
  const {
    target
  } = event;
  const targetClass = target.classList;

  if (targetClass.contains("card_item") || targetClass.contains("card_item_text")) {
    console.log("# drop");
    const parentNode = event.target.parentNode;
    const dropIndex = target.dataset.index;
    const dragOuterHTML = event.dataTransfer.getData("dragOuterHTML");
    const dragOuterIndex = event.dataTransfer.getData("dragOuterIndex");
    const dragIndex = event.dataTransfer.getData("dragIndex");

    // add drop el에 drag el
    const $div = document.createElement("div")
    $div.innerHTML = dragOuterHTML;
    $div.childNodes[0].dataset.index = dropIndex;
    event.target.outerHTML = $div.childNodes[0].outerHTML;

    // replace drop el 자리에 drag el
    event.target.dataset.index = dragIndex;
    const dragEl = document.querySelector(`div.card_contents_container[data-index='${dragOuterIndex}'] div[data-index='${dragIndex}']`)
    // parentNode.replaceChild(event.target , dragEl);
    document.querySelector(`div.card_contents_container[data-index='${dragOuterIndex}']`).replaceChild(event.target, dragEl)

    event.stopPropagation();
    event.preventDefault();
  }
}

function allowDrop(event) {
  const {
    target
  } = event;
  const targetClass = target.classList;

  if (targetClass.contains("card_item") || targetClass.contains("card_item_text")) {
    console.log("# allowDrop");
    event.stopPropagation();
    event.preventDefault();
  }
}

/**
 * # sidenav 기능
 */
document.querySelector(".header_menu").onclick = (e) => {
  const $sidenav = document.querySelector(".sidenav")
  const $container = document.querySelector(".container");
  const width = "300px";

  $sidenav.style.width = width;
  $sidenav.style.padding = "10px"
  $container.style.marginRight = width;
}
document.querySelectorAll(".sidenav_content").forEach((el, i) => {
  const $sidenavContainerList = document.querySelectorAll(".sidenav_container");

  el.onclick = (e) => {
    console.log('sidenav_content(side 메뉴)', e);
    console.log('$sidenavContainerList', $sidenavContainerList);
    const sideMenuIndex = e.currentTarget.dataset.index;

    [...$sidenavContainerList].forEach((e, i) => {
      if (e.dataset.index === sideMenuIndex) {
        e.style.display = 'block';
      } else {
        e.style.display = 'none';
      }
    })
  }
})
document.querySelectorAll("#sidenav_back_home").forEach((el, i) => {
  const $sidenavContainerList = document.querySelectorAll(".sidenav_container");
  const $homeIndex = document.querySelector("#sidenav_main");
  el.onclick = (e) => {
    [...$sidenavContainerList].forEach((e, i) => {
      if (e.dataset.index === $homeIndex.dataset.index) {
        e.style.display = 'block';
      } else {
        e.style.display = 'none';
      }
    })
  }
})
document.querySelectorAll(".sidenav_closebtn").forEach((el, i) => {
  const $sidenav = document.querySelector(".sidenav")
  const $container = document.querySelector(".container");

  el.onclick = (e) => {
    $sidenav.style.width = "0";
    $sidenav.style.padding = "0px"
    $container.style.marginRight = "0";

    [...$sidenavContainerList].forEach((e, i) => {
      e.style.display = 'none';
    })
  }
})