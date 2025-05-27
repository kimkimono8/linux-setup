import { UIUtil1 } from "../../../../common/ui/ui_util.js";
import { InvalidCharConsumer } from "../../../../common/ui/util/InvalidCharConsumer.js";
import { regexUtil } from "../../../../common/util/regexUtil.js";
import { TagQuery } from "../../../../src/service/bgApi/types.js";
import { VI18N } from "../../../../src/service/vt/VI18n.js";
export class BasePasswordAddTagComponent {
    p = null;
    tagQuery = null;
    constructor() {
        js.fn.bindThis(this, [this.getTagsSelect2, this.handleSelect2CreateTag]);
    }
    async createUI() {
        try {
            this.tagQuery = new TagQuery();
            const tagSelect = this.getTagsSelectElem();
            $(tagSelect).select2({
                dropdownParent: $(document.body),
                placeholder: "",
                tags: true,
                tokenSeparators: [","],
                ajax: {
                    transport: this.getTagsSelect2
                },
                createTag: this.handleSelect2CreateTag
            });
            $(tagSelect).on("change.select2", this.p.listener.handleTagsChange);
            this.addInvalidCharListener();
        }
        catch (e) {
            logError(e);
        }
    }
    async getTagsSelect2(params, on_success, _on_failure) {
        const select2_data = params.data;
        if (this.tagQuery.search_string != select2_data.term) {
            this.tagQuery.search_string = select2_data.term || "";
        }
        if (typeof select2_data.page != "undefined") {
            this.tagQuery.page_no = select2_data.page - 1;
        }
        this.tagQuery.excludeTags = this.getTags();
        const result = await bgApi.secret.queryTags(this.tagQuery);
        const req_tags = result.tags.map(tag => ({ id: tag, text: tag }));
        const currentPageEnd = (this.tagQuery.page_no + 1) * this.tagQuery.rows_per_page;
        const hasMore = currentPageEnd < result.total_count;
        on_success({
            results: req_tags,
            pagination: {
                more: hasMore
            }
        });
    }
    checkTags() {
        try {
            const tags = this.getTags();
            this.p.text("[data-field_row='tags'] [data-error]", "");
            const invalid_set = new Set(regexUtil.getNonClearTextChars(tags.join(",")));
            if (invalid_set.size == 0) {
                return true;
            }
            const errorMsg = this.p.util.getMustNotContain(VI18N.TAGS, Array.from(invalid_set));
            this.p.text("[data-field_row='tags'] [data-error]", errorMsg);
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    checkFinalTags() {
        try {
            const valid = this.checkTags();
            if (valid) {
                return true;
            }
            const tagSelect = this.getTagsSelectElem();
            tagSelect.focus();
            UIUtil1.inst.scrollIntoView(tagSelect);
            return false;
        }
        catch (e) {
            logError(e);
            return false;
        }
    }
    getTags() {
        try {
            const tagSelect = this.getTagsSelectElem();
            const tags = $(tagSelect).val() || [];
            return tags;
        }
        catch (e) {
            logError(e);
            return [];
        }
    }
    setTags(tags) {
        try {
            const tagsSelect = this.getTagsSelectElem();
            tags.forEach(x => $(tagsSelect).append(new Option(x, x, false, false)));
            $(tagsSelect).val(tags).trigger("change.select2");
        }
        catch (e) {
            logError(e);
        }
    }
    getTagsSelectElem() {
        return this.p.select("[data-tags_select]");
    }
    addInvalidCharListener() {
        try {
            const tagSelectElem = this.getTagsSelectElem();
            const searchInputElem = $(tagSelectElem).data("select2").$container[0].querySelector("input");
            new InvalidCharConsumer().consumeInvalidChars(searchInputElem, regexUtil.vaultRegex.cleartext);
        }
        catch (e) {
            logError(e);
        }
    }
    handleSelect2CreateTag(params) {
        const validString = regexUtil.replaceNonClearTextChars(params.term).trim();
        if (!validString) {
            return null;
        }
        return {
            id: validString,
            text: validString
        };
    }
}
