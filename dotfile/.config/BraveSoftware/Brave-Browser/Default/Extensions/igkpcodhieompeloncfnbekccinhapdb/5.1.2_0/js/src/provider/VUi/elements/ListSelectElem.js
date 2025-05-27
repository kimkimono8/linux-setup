import { VI18N } from "../../../service/vt/VI18n.js";
import { VaultCSS } from "../../../service/VUi/VaultCSS.js";
class ValueSelection {
    value;
    selected;
    elem;
    constructor(value, selected) {
        this.value = value;
        this.selected = selected;
    }
}
export class ListSelectElementImpl {
    static TEXT_SELECT_ALL = i18n(VI18N.SELECT_ALL);
    static TEXT_UNSELECT_ALL = i18n(VI18N.UNSELECT_ALL);
    static SELECTION_CHANGED = "SELECTION_CHANGED";
    static createListSelect(params) {
        const selectElem = new ListSelectElementImpl();
        selectElem.init(params);
        return selectElem;
    }
    elem;
    inputList = [];
    selectedList = [];
    visibleList = [];
    searchString = "";
    outputContainer;
    placeholderElem;
    outputTextElem;
    outputClearElem;
    outputPlusCountElem;
    dropdownArrowElem;
    dropdownContainerElem;
    dropdownListContainerElem;
    searchElem;
    searchClearElem;
    searchNoMatchElem;
    displayedElemList;
    selectAllElem;
    constructor() { }
    init(params) {
        try {
            this.inputList = params.list.map(x => new ValueSelection(x, false));
            this.initUI();
            js.dom.setText(this.placeholderElem, params.placeholder || "");
            this.initSelectedParam(params);
            if (params.keepDropdownOpen) {
                this.onDocumentClick = js.fn.emptyFn;
                this.showList(true);
            }
        }
        catch (e) {
            logError(e);
        }
    }
    getSelected() {
        try {
            return this.selectedList.map(x => x.value);
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    onSelectionChanged(listener) {
        try {
            this.elem.addEventListener(ListSelectElementImpl.SELECTION_CHANGED, e => listener(...e.detail));
        }
        catch (e) {
            logError(e);
        }
    }
    setValue(value, selected) {
        try {
            const valueSelection = this.inputList.find(x => x.value == value);
            if (!valueSelection) {
                info(ListSelectElementImpl.name, "not found - value: ", value);
                return;
            }
            valueSelection.selected = selected;
            this.updateSelection(valueSelection);
            valueSelection.elem.changeSelected(selected);
        }
        catch (e) {
            logError(e);
        }
    }
    async refreshUI() {
        try {
            await js.dom.waitAnimationFrame();
            this.updateOutputSelection();
        }
        catch (e) {
            logError(e);
        }
    }
    initUI() {
        try {
            this.onDocumentClick = this.onDocumentClick.bind(this);
            this.initUIElems();
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    initUIElems() {
        try {
            const elem = this.elem = UIUtil.createElem({ template: "#list-select_template", preRender: true });
            this.placeholderElem = js.selector.selectFrom(elem, "[data-placeholder]");
            this.outputContainer = js.selector.selectFrom(this.elem, "[data-output_container]");
            this.outputTextElem = js.selector.selectFrom(this.outputContainer, "[data-output]");
            this.outputClearElem = js.selector.selectFrom(this.outputContainer, "[data-clear]");
            this.outputPlusCountElem = js.selector.selectFrom(this.outputContainer, "[data-plus_count]");
            this.dropdownArrowElem = js.selector.selectFrom(this.outputContainer, "[data-arrow]");
            this.dropdownContainerElem = js.selector.selectFrom(this.elem, "[data-dropdown_container]");
            this.dropdownListContainerElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-dropdown_list_container]");
            this.searchElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-search]");
            this.searchClearElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-clear]");
            this.searchNoMatchElem = js.selector.selectFrom(this.dropdownContainerElem, "[data-no_match]");
            this.intiSelectAll();
        }
        catch (e) {
            logError(e);
        }
    }
    intiSelectAll() {
        try {
            const row = ListSelectRowElem.create(new ValueSelection(ListSelectElementImpl.TEXT_SELECT_ALL, false));
            const container = js.selector.selectFrom(this.elem, "[data-select_all_container]");
            js.dom.setContent(container, row.elem);
            this.selectAllElem = row;
        }
        catch (e) {
            logError(e);
        }
    }
    addListeners() {
        try {
            this.outputContainer.addEventListener("click", () => this.onOutputTextContainerClick());
            this.outputClearElem.addEventListener("click", (e) => this.onClearSelection(e));
            this.selectAllElem.onSelectionChange(() => this.onSelectAllClick());
            this.searchElem.addEventListener("input", () => this.onSearch());
            this.searchClearElem.addEventListener("click", () => this.onClearSearch());
        }
        catch (e) {
            logError(e);
        }
    }
    initSelectedParam(params) {
        try {
            if (!params.selected) {
                return;
            }
            let valueObj;
            for (let value of params.selected) {
                valueObj = this.inputList.find(x => x.value == value);
                if (!valueObj) {
                    continue;
                }
                valueObj.selected = true;
                this.updateSelectionList(valueObj);
            }
            this.updateSelectAll();
            this.updateOutputSelection();
        }
        catch (e) {
            logError(e);
        }
    }
    onOutputTextContainerClick() {
        try {
            const isShown = !this.dropdownContainerElem.classList.contains(VaultCSS.DIS_HIDE);
            if (isShown) {
                this.showList(false);
                return;
            }
            this.searchElem.value = "";
            this.searchString = "";
            this.showList(true);
        }
        catch (e) {
            logError(e);
        }
    }
    showList(show) {
        try {
            if (!show) {
                this.hideList();
                return;
            }
            js.dom.setContent(this.dropdownListContainerElem, this.getValueList());
            this.dropdownArrowElem.className = VaultCSS.UP_ARROW;
            this.updateSelectAll();
            js.dom.show(this.dropdownContainerElem);
            this.searchElem.focus();
            this.displayedElemList.length > 0 ? VUI.hide(this.searchNoMatchElem) : VUI.show(this.searchNoMatchElem);
            document.removeEventListener("click", this.onDocumentClick);
            document.addEventListener("click", this.onDocumentClick);
        }
        catch (e) {
            logError(e);
        }
    }
    getValueList() {
        try {
            const fragment = document.createDocumentFragment();
            const unselectedList = this.inputList.filter(x => !x.selected);
            const list = this.visibleList = this.filterSearch(this.selectedList).concat(this.filterSearch(unselectedList));
            const rowList = [];
            let row;
            for (let x of list) {
                row = this.getListElem(x);
                fragment.append(row.elem);
                rowList.push(row);
            }
            this.displayedElemList = rowList;
            return fragment;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    getListElem(selectObj) {
        try {
            const elem = ListSelectRowElem.create(selectObj);
            elem.onSelectionChange(() => this.onListSelectionChanged(selectObj));
            elem.changeSelected(selectObj.selected);
            return elem;
        }
        catch (e) {
            logError(e);
            return null;
        }
    }
    onListSelectionChanged(valueSelection) {
        try {
            this.updateSelection(valueSelection);
            this.dispatchOnSelectionChanged();
        }
        catch (e) {
            logError(e);
        }
    }
    dispatchOnSelectionChanged() {
        this.elem.dispatchEvent(new CustomEvent(ListSelectElementImpl.SELECTION_CHANGED, { detail: [this.getSelected()] }));
    }
    updateSelection(valueSelection) {
        try {
            this.updateSelectionList(valueSelection);
            this.updateSelectAll();
            this.updateOutputSelection();
        }
        catch (e) {
            logError(e);
        }
    }
    updateSelectAll() {
        try {
            if (this.visibleList.length < 2) {
                js.dom.hide(this.selectAllElem.elem);
                return;
            }
            const selectAll = this.visibleList.some(x => !x.selected);
            this.selectAllElem.setText(selectAll ? ListSelectElementImpl.TEXT_SELECT_ALL : ListSelectElementImpl.TEXT_UNSELECT_ALL);
            this.selectAllElem.changeSelected(!selectAll);
            js.dom.show(this.selectAllElem.elem);
        }
        catch (e) {
            logError(e);
        }
    }
    filterSearch(list) {
        try {
            const searchString = this.searchString.toLowerCase();
            return list.filter(x => x.value.toLowerCase().includes(searchString));
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    hideList() {
        try {
            this.dropdownArrowElem.className = VaultCSS.DOWN_ARROW;
            this.dropdownContainerElem.classList.add(VaultCSS.DIS_HIDE);
            document.removeEventListener("click", this.onDocumentClick);
        }
        catch (e) {
            logError(e);
        }
    }
    onDocumentClick(e) {
        try {
            if (this.elem.contains(e.target)) {
                return;
            }
            this.hideList();
        }
        catch (e) {
            logError(e);
        }
    }
    updateSelectionList(valueSelection) {
        try {
            if (valueSelection.selected) {
                this.selectedList.push(valueSelection);
                return;
            }
            js.array.removeElem(this.selectedList, valueSelection);
        }
        catch (e) {
            logError(e);
        }
    }
    onSearch() {
        try {
            this.searchString = this.searchElem.value;
            js.dom.showHide(this.searchString.length > 0, this.searchClearElem);
            this.showList(true);
        }
        catch (e) {
            logError(e);
        }
    }
    onClearSearch() {
        try {
            this.searchElem.value = "";
            this.onSearch();
        }
        catch (e) {
            logError(e);
        }
    }
    onSelectAllClick() {
        try {
            const selectAll = this.selectAllElem.isSelected();
            for (let x of this.visibleList) {
                if (x.selected == selectAll) {
                    continue;
                }
                x.selected = selectAll;
                this.updateSelectionList(x);
            }
            this.showList(true);
            this.updateOutputSelection();
            this.dispatchOnSelectionChanged();
        }
        catch (e) {
            logError(e);
        }
    }
    onClearSelection(e) {
        try {
            e.stopPropagation();
            this.inputList.forEach(x => x.selected = false);
            this.selectedList.length = 0;
            for (let row of this.displayedElemList) {
                row.changeSelected(false);
            }
            this.selectAllElem.changeSelected(false);
            this.selectAllElem.setText(ListSelectElementImpl.TEXT_SELECT_ALL);
            this.updateOutputSelection();
            this.elem.dispatchEvent(new CustomEvent(ListSelectElementImpl.SELECTION_CHANGED, { detail: [[]] }));
        }
        catch (e) {
            logError(e);
        }
    }
    updateOutputSelection() {
        try {
            const selectedElems = this.selectedList;
            const hasSelections = selectedElems.length > 0;
            if (!hasSelections) {
                js.dom.show(this.placeholderElem);
                js.dom.hide(this.outputClearElem, this.outputTextElem, this.outputPlusCountElem);
                return;
            }
            js.dom.show(this.outputClearElem, this.outputTextElem);
            js.dom.hide(this.placeholderElem);
            const maxI = this.getMaxSelectionTextAddable();
            const text = maxI > 0 ? selectedElems.slice(0, maxI).map(x => x.value).join(", ") : selectedElems[0].value;
            const ellipsis = maxI < selectedElems.length ? ", ..." : "";
            js.dom.setText(this.outputTextElem, text + ellipsis);
            const plusIndex = maxI > 0 ? maxI : 1;
            const plusCount = selectedElems.length - plusIndex;
            this.updatePlusCount(plusCount);
        }
        catch (e) {
            logError(e);
        }
    }
    updatePlusCount(count) {
        try {
            if (count == 0) {
                js.dom.hide(this.outputPlusCountElem);
                return;
            }
            js.dom.setText(this.outputPlusCountElem, "+" + count);
            js.dom.show(this.outputPlusCountElem);
        }
        catch (e) {
            logError(e);
        }
    }
    getMaxSelectionTextAddable() {
        try {
            js.dom.hide(this.outputPlusCountElem);
            const selectedElems = this.selectedList;
            this.outputTextElem.textContent = selectedElems.map(x => x.value).join(", ");
            if (!this.hasEllipsis(this.outputTextElem)) {
                return selectedElems.length;
            }
            js.dom.show(this.outputPlusCountElem);
            for (let i = 1; i <= selectedElems.length; i++) {
                this.outputTextElem.textContent = selectedElems.slice(0, i).map(x => x.value).join(", ") + ", ...";
                if (this.hasEllipsis(this.outputTextElem)) {
                    return i - 1;
                }
            }
            return selectedElems.length;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
    hasEllipsis(elem) {
        try {
            const width = this.getTextWidth(elem.textContent);
            const parentWidth = elem.parentElement.offsetWidth;
            return width >= parentWidth;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getTextWidth(s) {
        try {
            const span = document.createElement("span");
            span.textContent = s;
            document.body.append(span);
            const width = span.offsetWidth;
            span.remove();
            return width;
        }
        catch (e) {
            logError(e);
            return 0;
        }
    }
}
class ListSelectRowElem {
    valueSelection;
    static SELECTION_CHANGE_EVENT = "selectionChanged";
    static create(valueSelection) {
        const row = new ListSelectRowElem(valueSelection);
        row.initUI();
        return row;
    }
    elem;
    constructor(valueSelection) {
        this.valueSelection = valueSelection;
        valueSelection.elem = this;
    }
    initUI() {
        try {
            const elem = this.elem = UIUtil.createElem({ template: "#list-select-row_template" });
            js.dom.setChildText(elem, "[data-text]", this.valueSelection.value);
            this.addListeners();
        }
        catch (e) {
            logError(e);
        }
    }
    onSelectionChange(listener) {
        try {
            this.elem.addEventListener(ListSelectRowElem.SELECTION_CHANGE_EVENT, listener);
        }
        catch (e) {
            logError(e);
        }
    }
    setText(text) {
        js.dom.setChildText(this.elem, "[data-text]", text);
    }
    changeSelected(selected) {
        try {
            const inputElem = js.selector.selectFrom(this.elem, "input");
            inputElem.checked = selected;
        }
        catch (e) {
            logError(e);
        }
    }
    isSelected() {
        try {
            const inputElem = js.selector.selectFrom(this.elem, "input");
            return inputElem.checked;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    addListeners() {
        try {
            const inputElem = js.selector.selectFrom(this.elem, "input");
            inputElem.addEventListener("click", () => this.onCheckboxInput(inputElem.checked));
        }
        catch (e) {
            logError(e);
        }
    }
    onCheckboxInput(selected) {
        try {
            this.valueSelection.selected = selected;
            const event = new CustomEvent(ListSelectRowElem.SELECTION_CHANGE_EVENT, { detail: selected });
            this.elem.dispatchEvent(event);
        }
        catch (e) {
            logError(e);
        }
    }
}
