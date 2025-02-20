import { ChainablePromiseElement } from 'webdriverio';
import contextMenu, {
  ContextMenuDatabucketActions
} from '../libs/context-menu';
import utils from '../libs/utils';

class Databuckets {
  public get nameInput(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('app-environment-databuckets input[formcontrolname="name"]');
  }

  public get documentationInput(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(
      'app-environment-databuckets input[formcontrolname="documentation"]'
    );
  }

  public get valueInput(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('app-environment-databuckets input[formcontrolname="value"]');
  }

  public get filter(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('input[id="databucket-filter"]');
  }

  public get idElement(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('.environment-databuckets-footer div');
  }

  public get addBtn(): ChainablePromiseElement<WebdriverIO.Element> {
    return $('.databuckets-menu .nav:first-of-type .nav-item .nav-link');
  }

  public async select(databucketIndex: number): Promise<void> {
    await $(
      `.databuckets-menu .menu-list .nav-item:nth-child(${databucketIndex}) .nav-link`
    ).click();
  }

  public async add(): Promise<void> {
    await this.addBtn.click();
  }

  public async duplicate(index: number) {
    await contextMenu.click(
      'databuckets',
      index,
      ContextMenuDatabucketActions.DUPLICATE
    );
  }

  public async duplicateToEnv(index: number) {
    await contextMenu.click(
      'databuckets',
      index,
      ContextMenuDatabucketActions.DUPLICATE_TO_ENV
    );
  }

  public async copyID(index: number) {
    await contextMenu.click(
      'databuckets',
      index,
      ContextMenuDatabucketActions.COPY_ID
    );
  }

  public async remove(index: number) {
    await contextMenu.clickAndConfirm(
      'databuckets',
      index,
      ContextMenuDatabucketActions.DELETE
    );
  }

  public async assertName(expected: string) {
    expect(await this.nameInput.getValue()).toEqual(expected);
  }

  public async assertDocumentation(expected: string) {
    expect(await this.documentationInput.getValue()).toEqual(expected);
  }

  public async setName(value: string): Promise<void> {
    await utils.setElementValue(this.nameInput, value);
  }

  public async setDocumentation(value: string): Promise<void> {
    await utils.setElementValue(this.documentationInput, value);
  }

  public async setFilter(text: string) {
    await utils.setElementValue(this.filter, text);
  }

  public async assertFilter(expected: string) {
    expect(await this.filter.getValue()).toEqual(expected);
  }

  public async clearFilter() {
    $('.btn[ngbTooltip="Clear filter"]').click();
  }

  public async assertCount(expected: number) {
    await utils.countElements(
      $$('.databuckets-menu .menu-list .nav-item:not(.d-none)'),
      expected
    );
  }
}

export default new Databuckets();
