import handlebars from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseTemplateDTO from '../dtos/IParseTemplateDTO';

export default class HandleBarsTemplateMailProvider
  implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}
