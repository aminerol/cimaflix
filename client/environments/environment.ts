// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { Category } from '../app/models/categorie';

export const environment = {
  production: true,
  Endpoint: "https://cimaflix.cf/",
  apiEndpoint: "https://cimaflix.cf/api/",
  categories: [ 
    new Category(4, "مسلسلات رمضان 2018", "مسلسلات-رمضان-2018"),
    new Category(3, "مسلسلات تركية", "مسلسلات-تركية"),
    new Category(0, "مسلسلات اجنبية", "مسلسلات-اجنبية"),
    new Category(1, "مسلسلات عربية", "مسلسلات-عربية"),
    new Category(2, "مسلسلات اسيوية", "مسلسلات-اسيوية"),
    new Category(5, "مسلسلات هندية", "مسلسلات-هندية")
  ],
  description: 'CimaFlix مشاهدة جميع المسلسلات التركية و العربية و الاجنبية مترجمة اونلاين و بدون تقطيع و جودة عالية مجانا على سيمافليكس، رامز، مسلسل، تركي، اجنبي | {{description}}',
  serietags: 'شاهد مسلسل {{serie.title}}،  مسلسل {{serie.title}} HD، مسلسل {{serie.title}} بدون تقطيع، شاهد مسلسل {{serie.title}} اونلاين، شاهد مسلسل {{serie.title}} اليوتيوب، شاهد مسلسل {{serie.title}} مجانا، شاهد مسلسل {{serie.title}} مترجم، مسلسل {{serie.title}} كامل بدون تقطيع، مسلسل {{serie.title}} HD بدون تقطيع، مسلسل {{serie.title}} جودة عالية، مسلسل {{serie.title}} جودة متوسطة، شاهد مسلسل {{serie.title}} على الهاتف، جميع حلقات مسلسل {{serie.title}} كاملة',
  seasontags: 'شاهد مسلسل {{serie.title}} الموسم {{season.number}}،  مسلسل {{serie.title}} موسم {{season.number}} HD، مسلسل {{serie.title}} الموسم {{season.number}} بدون تقطيع، شاهد مسلسل {{serie.title}} الموسم {{season.number}} اونلاين، شاهد مسلسل {{serie.title}} الموسم {{season.number}}  اليوتيوب، شاهد مسلسل {{serie.title}} الموسم {{season.number}} مجانا، شاهد مسلسل {{serie.title}} الموسم {{season.number}} مترجم، مسلسل {{serie.title}} الموسم {{season.number}} كامل بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} HD بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} جودة عالية، مسلسل {{serie.title}} الموسم {{season.number}} جودة متوسطة، شاهد مسلسل {{serie.title}} الموسم {{season.number}} على الهاتف، جميع حلقات مسلسل {{serie.title}} الموسم {{season.number}} كامل',
  episodetags: 'شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}}،  مسلسل {{serie.title}} موسم {{season.number}} الحلقة {{episode.number}} HD، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} بدون تقطيع، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} اونلاين، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}}  اليوتيوب، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} مجانا، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} مترجمة، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} كاملة بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} HD بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} جودة عالية، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} جودة متوسطة، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} على الهاتف، جميع حلقات مسلسل {{serie.title}} الموسم {{season.number}} كامل'
  
};
