class labelUi{

  constructor(config){
    this.containerSelector = config.dropdownLayerContainerSelector;
    this.chipDataList = config.data;

    this.container = document.querySelector(this.containerSelector);

    this.chipElements = this.initialize(this.containerSelector, this.chipDataList);
    this.inputElement = this.initializeInput(this.container);
    debugger;
    // event listen
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
            <div class="dl_label_item_container">
              <label class="dl_label_item ${initData.color}" data-index="${initData.idx}">${initData.label}</label>
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </div>
          `
      )
      .join('');

    const $addLabelInput = `<div class="dl_add_label_container">
      <input id="dl_add_label_input" type="text" placeholder="add labels...">
    </div>`
    
    let $initDataHtml = `
      <div class="dl_title_container">
        <span class="dl_title">Label</span>
        <span>
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
      <div class="dl_search_container">
        <input type="text" placeholder="Search labels...">
      </div>
      <div class="dl_labels_container">
        <div class="dl_label_title">
          <label>LABELS</label>
        </div>
        ${$labelListDom}
      </div>
        ${$addLabelInput}
      `
    $dropdownLayer.innerHTML = $initDataHtml;
    const container = document.querySelector(containerSelector);
    this.$dropdownLayer = $dropdownLayer;
    container.appendChild($dropdownLayer);
    return container;
  }
  initializeInput(){
    
  }
  eventBinding(){
    
  }
  getChips(){
    
  }
}