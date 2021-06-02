class InstantSearchComponent {
  constructor(config){
    this.DEFAULT_DELAY_TIME = 500;

    // 설정정보
    // callback setup
    this.callback = config?.changeEvent;
    // delayTime setup
    this.delayTime = config.config?.delayTime ?? this.DEFAULT_DELAY_TIME;
    this.searchData = config.config?.data

    // 초기 템플릿 display, 이벤트 대상 저장
    this.textinputElement = this.initialize(
      document.querySelector(config.appendSelector),
      config.config
    );
    
    const template = document.createElement("div");
    template.innerText = 'search';
    this.template = template;

    // event listen
    this.eventBinding();
  }
  initialize(selector, config){
    const containerDiv = document.createElement('div');
    containerDiv.classList.add("dl_search_container");
    
    const textInput = document.createElement('input');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('placeholder', config.placeholder);
    // textInput.classList.add(configuration.css);
    selector.appendChild(textInput);

    // <div class="dl_search_container">
    //   <input type="text" placeholder="Search labels...">
    // </div>

    return selector;

  }

  serachfn(word) {
    console.log("## searchfn");
    const result = this.searchData.filter(v => {
      return v.label.indexOf(word) >= 0;
    })
    const container = document.querySelector(this.labelAppendContainerSelector);
    const labelContainer = container.children[0].getBoundingClientRect();
    const containerWidth = labelContainer.width;
    const containerTop = labelContainer.top;
    const containerLeft = labelContainer.left;
    
    container.innerHTML = '';
    const containerElement = this.labelInit(this.labelAppendContainerSelector, result).children[0];
    containerElement.style.width = containerWidth+"px";
    containerElement.style.top = `${containerTop}px`;
    containerElement.style.left = `${containerLeft}px`

    return result
  }

  eventBinding() {
    const dispatchEvent = debounce((targetText) => {
      debugger;
      const result = this.serachfn(targetText);
    }, this.delayTime);

    this.textinputElement.addEventListener('keyup', (event) => {
      dispatchEvent(event.target.value);
    });
  }
}