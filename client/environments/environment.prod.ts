import { Category } from "../app/models/categorie";

export const environment = {
  production: true,
  apiEndpoint: "http://cimaflix.cf/",
  categories: [ 
    new Category(4, "مسلسلات رمضان 2018", "مسلسلات-رمضان-2018"),
    new Category(3, "مسلسلات تركية", "مسلسلات-تركية"),
    new Category(0, "مسلسلات اجنبية", "مسلسلات-اجنبية"),
    new Category(1, "مسلسلات عربية", "مسلسلات-عربية"),
    new Category(2, "مسلسلات اسيوية", "مسلسلات-اسيوية"),
    new Category(5, "مسلسلات هندية", "مسلسلات-هندية")
  ],
  serietags: 'شاهد مسلسل {{serie.title}}،  مسلسل {{serie.title}} HD، مسلسل {{serie.title}} بدون تقطيع، شاهد مسلسل {{serie.title}} اونلاين، شاهد مسلسل {{serie.title}} اليوتيوب، شاهد مسلسل {{serie.title}} مجانا، شاهد مسلسل {{serie.title}} مترجم، مسلسل {{serie.title}} كامل بدون تقطيع، مسلسل {{serie.title}} HD بدون تقطيع، مسلسل {{serie.title}} جودة عالية، مسلسل {{serie.title}} جودة متوسطة، شاهد مسلسل {{serie.title}} على الهاتف، جميع حلقات مسلسل {{serie.title}} كاملة',
  seasontags: 'شاهد مسلسل {{serie.title}} الموسم {{season.number}}،  مسلسل {{serie.title}} موسم {{season.number}} HD، مسلسل {{serie.title}} الموسم {{season.number}} بدون تقطيع، شاهد مسلسل {{serie.title}} الموسم {{season.number}} اونلاين، شاهد مسلسل {{serie.title}} الموسم {{season.number}}  اليوتيوب، شاهد مسلسل {{serie.title}} الموسم {{season.number}} مجانا، شاهد مسلسل {{serie.title}} الموسم {{season.number}} مترجم، مسلسل {{serie.title}} الموسم {{season.number}} كامل بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} HD بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} جودة عالية، مسلسل {{serie.title}} الموسم {{season.number}} جودة متوسطة، شاهد مسلسل {{serie.title}} الموسم {{season.number}} على الهاتف، جميع حلقات مسلسل {{serie.title}} الموسم {{season.number}} كامل',
  episodetags: 'شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}}،  مسلسل {{serie.title}} موسم {{season.number}} الحلقة {{episode.number}} HD، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} بدون تقطيع، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} اونلاين، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}}  اليوتيوب، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} مجانا، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} مترجمة، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} كاملة بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} HD بدون تقطيع، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} جودة عالية، مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} جودة متوسطة، شاهد مسلسل {{serie.title}} الموسم {{season.number}} الحلقة {{episode.number}} على الهاتف، جميع حلقات مسلسل {{serie.title}} الموسم {{season.number}} كامل'
  
};
