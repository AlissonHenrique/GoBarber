import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseTemplateDTO from '../dtos/IParseTemplateDTO';

export default class FakeMailProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseTemplateDTO): Promise<string> {
    return template;
  }
}
