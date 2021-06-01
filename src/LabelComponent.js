class LabelComponent {

  constructor(config){
    this.containerSelector = config.dropdownLayerContainerSelector;
    this.labelDataList = config.config.data;
    this.options = config.config.options;

    this.container = document.querySelector(this.containerSelector);
    this.labelElements = this.initialize(this.containerSelector, this.labelDataList);
    this.inputElement = this.initializeInput(this.container);

    this.InstantSearchComponent = InstantSearchComponent;
    if(this.options?.simpleSearch){
      const simpleSearchConfig = {
        appendSelector: ".dl_search_container",
        config: {
          data: this.labelDataList,
          placeholder: "Search Label...", 
          delayTime: 600,
        }
      }

      let InstantSearchComponent = new this.InstantSearchComponent(simpleSearchConfig);
      InstantSearchComponent.labelAppendContainerSelector = this.containerSelector;
      InstantSearchComponent.labelInit = this.initialize;
    }
    
    this.eventBinding();
  }

  initialize(containerSelector, data){
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

    const $labelListDom = data
      .map(
        (initData, idx) =>
          `
            <div class="dl_label_item_container" data-index="${initData.index}">
              <label id="labelTitle" class="dl_label_item ${initData.color}" >${initData.label}</label>
              <i id="labelDel" class="fa fa-times" aria-hidden="true"></i>
            </div>
          `
      ).join('');

    const $addLabelInput = `
      <div class="dl_add_label_container">
        <input id="labelInput" class="
        labelInput" type="text" placeholder="add labels...">
      </div>
    `;
    
    let $initDataHtml = `
      <div class="dl_title_container">
        <span class="dl_title">Label</span>
        <span>
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <div class="dl_search_container"></div>
      <div class="dl_labels_container">
        <div class="dl_label_title">
          <label>LABELS</label>
        </div>
        ${$labelListDom}
      </div>
        ${$addLabelInput}
    `;

    // <div class="dl_search_container">
    //   <input type="text" placeholder="Search labels...">
    // </div>

    $dropdownLayer.innerHTML = $initDataHtml;
    
    const container = document.querySelector(containerSelector);
    this.$dropdownLayer = $dropdownLayer;
    container.appendChild($dropdownLayer);

    return container;
  }

  initializeInput(){
    
  }

  eventBinding(){
    this.container.addEventListener(
      'keypress',
      ({ keyCode, target: { id, value }, target }) => {
        // 13 enter
        console.log("### keypress");

        if (id === 'labelInput' && keyCode === 13) {
          // preventDefault
          console.log({ value });
          const newItem = document.createElement('div');
          const index = this.labelDataList.length;
          const randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
          newItem.classList.add('dl_label_item_container');
          newItem.dataset.index = index;
          newItem.innerHTML = `
            <label id="labelTitle" class="dl_label_item" style="background-color:${randomColor};" >${value}</label>
            <i id="labelDel" class="fa fa-times" aria-hidden="true"></i>
          `;
          target.parentElement.previousElementSibling.insertAdjacentElement('beforeend', newItem);
          this.labelDataList.unshift({ index, data: value });
          target.value = '';
        }

        if (id === 'labelTitle' && keyCode === 13) {
          target.setAttribute("contentEditable", false);
          const targetBackgroundColor = getComputedStyle(target).borderColor;
        }
      }
    );

    this.container.addEventListener(
      'click',
      // ({ target, target: { id }, dataset, stopPropagation}) => {
      (event) => {
        const { target, target: { id }, dataset, stopPropagation} = event;
      // (event) => {
        // const clickindex = target.;
        // if (id === 'chipsClose') {
        if (id === 'labelDel') {
          let indexTargetEl = target;
          while (!indexTargetEl?.dataset.index) {
            indexTargetEl = indexTargetEl.parentElement;
          }

          // remove clicked dom
          indexTargetEl.remove();
          event.stopPropagation();
          // remove clicked chipDataList
          this.labelDataList = this.labelDataList.filter(
            (v) => v.index !== +indexTargetEl.dataset.index
          );
        }

        if(id === 'labelTitle'){
          /* 
            ## [point] 같은 label 클릭 방지.
          */
          if(document.activeElement === target) return ;
          console.log("### labelTitle");
          const targetBackgroundColor = getComputedStyle(target).backgroundColor;
          target.style.backgroundColor = "#fff";
          target.style.border = `1px ${targetBackgroundColor} solid`;
          target.style.boxShadow = `0 0 3px ${targetBackgroundColor}`;
          
          /* 
            ## [point] editable로 변경 후 focus 설정
          */
          target.setAttribute("contentEditable", true);
          target.focus()
        }
      }
    ); 

    this.container.addEventListener('focusout', ({target, target:{id}}) => {
      
      if(id === 'labelTitle'){
        console.log('focusout');
        target.setAttribute("contentEditable", false);
        const targetBackgroundColor = getComputedStyle(target).borderColor;
        target.style.backgroundColor = targetBackgroundColor;
        target.style.border = "none";
      }
    })
  }

  getValue(){
    return this.labelDataList
  }
}