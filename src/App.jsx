import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════
// FOOD DATABASE (450+ items, per 100g/ml)
// ═══════════════════════════════════════════════
const FOOD_DB = [
  // 🥛 МЛЕЧНИ
  {id:1,  name:"Млеко цело",             cat:"🥛 Млечни",      kcal:61,  p:3.2,c:4.8,f:3.3,unit:"ml"},
  {id:2,  name:"Млеко полуцелено",        cat:"🥛 Млечни",      kcal:46,  p:3.4,c:4.8,f:1.5,unit:"ml"},
  {id:3,  name:"Млеко обезмастено",       cat:"🥛 Млечни",      kcal:35,  p:3.4,c:5.0,f:0.1,unit:"ml"},
  {id:4,  name:"Млеко соино",             cat:"🥛 Млечни",      kcal:33,  p:2.9,c:1.8,f:1.8,unit:"ml"},
  {id:5,  name:"Млеко бадемово",          cat:"🥛 Млечни",      kcal:15,  p:0.6,c:0.6,f:1.0,unit:"ml"},
  {id:6,  name:"Млеко овесно",            cat:"🥛 Млечни",      kcal:45,  p:1.0,c:6.5,f:1.5,unit:"ml"},
  {id:7,  name:"Кисело млеко",            cat:"🥛 Млечни",      kcal:61,  p:3.5,c:4.7,f:3.3,unit:"g"},
  {id:8,  name:"Јогурт 2%",               cat:"🥛 Млечни",      kcal:56,  p:5.7,c:3.9,f:1.5,unit:"g"},
  {id:9,  name:"Грчки јогурт 0%",         cat:"🥛 Млечни",      kcal:59,  p:10, c:3.6,f:0.4,unit:"g"},
  {id:10, name:"Грчки јогурт 2%",         cat:"🥛 Млечни",      kcal:73,  p:9.9,c:3.6,f:2.0,unit:"g"},
  {id:11, name:"Јогурт со овошје",         cat:"🥛 Млечни",      kcal:95,  p:3.5,c:17, f:1.5,unit:"g"},
  {id:12, name:"Сирење бело",             cat:"🥛 Млечни",      kcal:264, p:18, c:2.0,f:20, unit:"g"},
  {id:13, name:"Сирење жолто гауда",       cat:"🥛 Млечни",      kcal:356, p:25, c:2.2,f:27, unit:"g"},
  {id:14, name:"Кашкавал",                cat:"🥛 Млечни",      kcal:330, p:23, c:2.5,f:25, unit:"g"},
  {id:15, name:"Моцарела",                cat:"🥛 Млечни",      kcal:280, p:22, c:2.2,f:20, unit:"g"},
  {id:16, name:"Пармезан",                cat:"🥛 Млечни",      kcal:431, p:38, c:4.1,f:29, unit:"g"},
  {id:17, name:"Рикота",                  cat:"🥛 Млечни",      kcal:174, p:11, c:3.0,f:13, unit:"g"},
  {id:18, name:"Урда",                    cat:"🥛 Млечни",      kcal:98,  p:11, c:3.4,f:4.3,unit:"g"},
  {id:19, name:"Крем сирење",             cat:"🥛 Млечни",      kcal:342, p:6.0,c:4.1,f:34, unit:"g"},
  {id:20, name:"Путер",                   cat:"🥛 Млечни",      kcal:717, p:0.9,c:0.1,f:81, unit:"g"},
  {id:21, name:"Павлака 20%",             cat:"🥛 Млечни",      kcal:195, p:2.8,c:3.4,f:19, unit:"g"},
  {id:22, name:"Павлака 30%",             cat:"🥛 Млечни",      kcal:292, p:2.2,c:2.8,f:30, unit:"g"},
  {id:23, name:"Сладолед ванила",         cat:"🥛 Млечни",      kcal:207, p:3.5,c:24, f:11, unit:"g"},
  {id:24, name:"Пудинг млечен",           cat:"🥛 Млечни",      kcal:110, p:3.0,c:17, f:3.3,unit:"g"},
  {id:25, name:"Едам сирење",             cat:"🥛 Млечни",      kcal:357, p:25, c:1.4,f:28, unit:"g"},
  // 🥚 ЈАЈЦА
  {id:30, name:"Јајце цело (60g=1kom)",   cat:"🥚 Јајца",       kcal:155, p:13, c:1.1,f:11, unit:"g"},
  {id:31, name:"Белка од јајце",          cat:"🥚 Јајца",       kcal:52,  p:11, c:0.7,f:0.2,unit:"g"},
  {id:32, name:"Жолчка",                  cat:"🥚 Јајца",       kcal:322, p:16, c:3.6,f:27, unit:"g"},
  {id:33, name:"Пржени јајца",            cat:"🥚 Јајца",       kcal:196, p:14, c:0.4,f:15, unit:"g"},
  {id:34, name:"Варени јајца",            cat:"🥚 Јајца",       kcal:155, p:13, c:1.1,f:11, unit:"g"},
  {id:35, name:"Омлет со млеко",          cat:"🥚 Јајца",       kcal:154, p:10, c:2.5,f:12, unit:"g"},
  // 🍗 МЕСО
  {id:40, name:"Пилешки гради",           cat:"🍗 Месо",         kcal:165, p:31, c:0,  f:3.6,unit:"g"},
  {id:41, name:"Пилешко бедро без кожа",  cat:"🍗 Месо",         kcal:177, p:25, c:0,  f:8.1,unit:"g"},
  {id:42, name:"Пилешко бедро со кожа",   cat:"🍗 Месо",         kcal:209, p:26, c:0,  f:11, unit:"g"},
  {id:43, name:"Пилешко крило",           cat:"🍗 Месо",         kcal:203, p:30, c:0,  f:9.0,unit:"g"},
  {id:44, name:"Пилешко цело печено",     cat:"🍗 Месо",         kcal:215, p:29, c:0,  f:11, unit:"g"},
  {id:45, name:"Говедско мешано",         cat:"🍗 Месо",         kcal:250, p:26, c:0,  f:15, unit:"g"},
  {id:46, name:"Говедско посно",          cat:"🍗 Месо",         kcal:158, p:26, c:0,  f:5.4,unit:"g"},
  {id:47, name:"Говедски одрезок",        cat:"🍗 Месо",         kcal:271, p:26, c:0,  f:18, unit:"g"},
  {id:48, name:"Говедско мелено",         cat:"🍗 Месо",         kcal:254, p:17, c:0,  f:20, unit:"g"},
  {id:49, name:"Свинско мешано",          cat:"🍗 Месо",         kcal:242, p:27, c:0,  f:14, unit:"g"},
  {id:50, name:"Свинско посно",           cat:"🍗 Месо",         kcal:143, p:26, c:0,  f:3.5,unit:"g"},
  {id:51, name:"Пуретина гради",          cat:"🍗 Месо",         kcal:135, p:30, c:0,  f:1.0,unit:"g"},
  {id:52, name:"Пуретина мелена",         cat:"🍗 Месо",         kcal:189, p:22, c:0,  f:11, unit:"g"},
  {id:53, name:"Јагнешко",                cat:"🍗 Месо",         kcal:294, p:25, c:0,  f:21, unit:"g"},
  {id:54, name:"Телешко",                 cat:"🍗 Месо",         kcal:172, p:26, c:0,  f:7.0,unit:"g"},
  {id:55, name:"Зечко",                   cat:"🍗 Месо",         kcal:173, p:29, c:0,  f:5.5,unit:"g"},
  {id:56, name:"Сарма зелкова",           cat:"🍗 Месо",         kcal:130, p:6.5,c:12, f:6.5,unit:"g"},
  {id:57, name:"Сарма лозова",            cat:"🍗 Месо",         kcal:140, p:7.0,c:13, f:7.0,unit:"g"},
  {id:58, name:"Пљескавица говедска",     cat:"🍗 Месо",         kcal:265, p:20, c:5.0,f:18, unit:"g"},
  {id:59, name:"Ќуфте",                   cat:"🍗 Месо",         kcal:220, p:18, c:8.0,f:13, unit:"g"},
  {id:60, name:"Шницла телешка",          cat:"🍗 Месо",         kcal:185, p:24, c:4.0,f:8.0,unit:"g"},
  {id:61, name:"Роштиљ пилешко",          cat:"🍗 Месо",         kcal:185, p:30, c:0,  f:7.0,unit:"g"},
  {id:62, name:"Пиперки полнети",         cat:"🍗 Месо",         kcal:125, p:7.0,c:13, f:5.0,unit:"g"},
  {id:63, name:"Мусака",                  cat:"🍗 Месо",         kcal:145, p:7.5,c:11, f:8.0,unit:"g"},
  // 🥩 КОЛБАСИ
  {id:70, name:"Шунка варена",            cat:"🥩 Колбаси",      kcal:107, p:17, c:1.5,f:3.8,unit:"g"},
  {id:71, name:"Шунка пушена",            cat:"🥩 Колбаси",      kcal:163, p:16, c:2.0,f:10, unit:"g"},
  {id:72, name:"Салами",                  cat:"🥩 Колбаси",      kcal:336, p:20, c:2.0,f:28, unit:"g"},
  {id:73, name:"Кобасица свинска",        cat:"🥩 Колбаси",      kcal:301, p:11, c:3.1,f:27, unit:"g"},
  {id:74, name:"Кобасица пилешка",        cat:"🥩 Колбаси",      kcal:185, p:14, c:3.0,f:13, unit:"g"},
  {id:75, name:"Хот-дог",                 cat:"🥩 Колбаси",      kcal:290, p:10, c:4.0,f:26, unit:"g"},
  {id:76, name:"Пастрма",                 cat:"🥩 Колбаси",      kcal:139, p:22, c:0,  f:5.4,unit:"g"},
  {id:77, name:"Сланина",                 cat:"🥩 Колбаси",      kcal:541, p:37, c:1.4,f:42, unit:"g"},
  {id:78, name:"Прошуто",                 cat:"🥩 Колбаси",      kcal:145, p:26, c:0.3,f:4.0,unit:"g"},
  {id:79, name:"Луканец",                 cat:"🥩 Колбаси",      kcal:340, p:16, c:2.0,f:29, unit:"g"},
  // 🐟 РИБА
  {id:90, name:"Туна конзерва во вода",   cat:"🐟 Риба",         kcal:116, p:26, c:0,  f:1.0,unit:"g"},
  {id:91, name:"Туна конзерва во масло",  cat:"🐟 Риба",         kcal:198, p:29, c:0,  f:9.0,unit:"g"},
  {id:92, name:"Туна свежа",              cat:"🐟 Риба",         kcal:144, p:23, c:0,  f:5.0,unit:"g"},
  {id:93, name:"Лосос свеж",              cat:"🐟 Риба",         kcal:208, p:20, c:0,  f:13, unit:"g"},
  {id:94, name:"Лосос пушен",             cat:"🐟 Риба",         kcal:117, p:18, c:0,  f:4.3,unit:"g"},
  {id:95, name:"Скуша",                   cat:"🐟 Риба",         kcal:205, p:19, c:0,  f:14, unit:"g"},
  {id:96, name:"Треска",                  cat:"🐟 Риба",         kcal:82,  p:18, c:0,  f:0.7,unit:"g"},
  {id:97, name:"Шкампи",                  cat:"🐟 Риба",         kcal:99,  p:24, c:0.2,f:0.3,unit:"g"},
  {id:98, name:"Сардини конзерва",        cat:"🐟 Риба",         kcal:208, p:25, c:0,  f:11, unit:"g"},
  {id:99, name:"Лигњи",                   cat:"🐟 Риба",         kcal:92,  p:16, c:3.1,f:1.4,unit:"g"},
  {id:100,name:"Октопод",                 cat:"🐟 Риба",         kcal:82,  p:15, c:2.2,f:1.0,unit:"g"},
  {id:101,name:"Мидии",                   cat:"🐟 Риба",         kcal:86,  p:12, c:3.7,f:2.2,unit:"g"},
  {id:102,name:"Харинга",                 cat:"🐟 Риба",         kcal:158, p:18, c:0,  f:9.0,unit:"g"},
  {id:103,name:"Тилапија",                cat:"🐟 Риба",         kcal:96,  p:20, c:0,  f:1.7,unit:"g"},
  // 🌾 ЖИТАРКИ
  {id:110,name:"Овесна каша сува",        cat:"🌾 Житарки",      kcal:389, p:17, c:66, f:7.0,unit:"g"},
  {id:111,name:"Овесна каша кувана",      cat:"🌾 Житарки",      kcal:68,  p:2.4,c:12, f:1.4,unit:"g"},
  {id:112,name:"Ориз бел сув",            cat:"🌾 Житарки",      kcal:365, p:7.1,c:80, f:0.7,unit:"g"},
  {id:113,name:"Ориз бел куван",          cat:"🌾 Житарки",      kcal:130, p:2.7,c:28, f:0.3,unit:"g"},
  {id:114,name:"Ориз кафеав куван",       cat:"🌾 Житарки",      kcal:112, p:2.6,c:24, f:0.9,unit:"g"},
  {id:115,name:"Тестенини кувани",        cat:"🌾 Житарки",      kcal:158, p:5.8,c:31, f:0.9,unit:"g"},
  {id:116,name:"Тестенини суви",          cat:"🌾 Житарки",      kcal:371, p:13, c:75, f:1.5,unit:"g"},
  {id:117,name:"Шпагети кувани",          cat:"🌾 Житарки",      kcal:157, p:5.8,c:30, f:0.9,unit:"g"},
  {id:118,name:"Леб бел",                 cat:"🌾 Житарки",      kcal:265, p:9.0,c:49, f:3.2,unit:"g"},
  {id:119,name:"Леб интегрален",          cat:"🌾 Житарки",      kcal:247, p:13, c:41, f:4.2,unit:"g"},
  {id:120,name:"Багет",                   cat:"🌾 Житарки",      kcal:274, p:9.0,c:53, f:2.0,unit:"g"},
  {id:121,name:"Кроасан",                 cat:"🌾 Житарки",      kcal:406, p:8.2,c:45, f:21, unit:"g"},
  {id:122,name:"Тортиља пченична",        cat:"🌾 Житарки",      kcal:306, p:8.0,c:52, f:7.3,unit:"g"},
  {id:123,name:"Тортиља пченкарна",       cat:"🌾 Житарки",      kcal:218, p:5.7,c:44, f:2.5,unit:"g"},
  {id:124,name:"Пита леб",                cat:"🌾 Житарки",      kcal:275, p:9.1,c:55, f:1.2,unit:"g"},
  {id:125,name:"Гранола",                 cat:"🌾 Житарки",      kcal:471, p:10, c:64, f:20, unit:"g"},
  {id:126,name:"Квиноа кувана",           cat:"🌾 Житарки",      kcal:120, p:4.4,c:22, f:1.9,unit:"g"},
  {id:127,name:"Корнфлекс",               cat:"🌾 Житарки",      kcal:357, p:7.5,c:84, f:0.5,unit:"g"},
  {id:128,name:"Мусли без шеќер",         cat:"🌾 Житарки",      kcal:364, p:10, c:62, f:8.0,unit:"g"},
  {id:129,name:"Брашно пченично",         cat:"🌾 Житарки",      kcal:364, p:10, c:76, f:1.0,unit:"g"},
  {id:130,name:"Полента кувана",          cat:"🌾 Житарки",      kcal:70,  p:1.5,c:15, f:0.3,unit:"g"},
  {id:131,name:"Кускус куван",            cat:"🌾 Житарки",      kcal:112, p:3.8,c:23, f:0.2,unit:"g"},
  {id:132,name:"Крекери",                 cat:"🌾 Житарки",      kcal:421, p:7.1,c:70, f:12, unit:"g"},
  {id:133,name:"Оризови вафли",           cat:"🌾 Житарки",      kcal:387, p:8.0,c:82, f:2.8,unit:"g"},
  {id:134,name:"Пуканки без масло",       cat:"🌾 Житарки",      kcal:375, p:12, c:74, f:4.0,unit:"g"},
  {id:135,name:"Палачинки тесто",         cat:"🌾 Житарки",      kcal:197, p:6.4,c:27, f:7.4,unit:"g"},
  {id:136,name:"Леб рж",                  cat:"🌾 Житарки",      kcal:259, p:8.5,c:48, f:3.3,unit:"g"},
  {id:137,name:"Ориз баисмати куван",     cat:"🌾 Житарки",      kcal:121, p:2.5,c:26, f:0.2,unit:"g"},
  // 🥧 ТРАДИЦИОНАЛНИ
  {id:150,name:"Бурек со месо",           cat:"🥧 Традиционални",kcal:298, p:10, c:22, f:19, unit:"g"},
  {id:151,name:"Бурек со сирење",         cat:"🥧 Традиционални",kcal:285, p:9.0,c:22, f:18, unit:"g"},
  {id:152,name:"Бурек со спанаќ",         cat:"🥧 Традиционални",kcal:220, p:6.0,c:22, f:12, unit:"g"},
  {id:153,name:"Баница",                  cat:"🥧 Традиционални",kcal:275, p:7.5,c:23, f:17, unit:"g"},
  {id:154,name:"Гравче тавче",            cat:"🥧 Традиционални",kcal:138, p:8.0,c:21, f:2.5,unit:"g"},
  {id:155,name:"Мешана скара",            cat:"🥧 Традиционални",kcal:240, p:22, c:0,  f:16, unit:"g"},
  {id:156,name:"Ајвар",                   cat:"🥧 Традиционални",kcal:85,  p:1.5,c:8.0,f:5.5,unit:"g"},
  {id:157,name:"Попара",                  cat:"🥧 Традиционални",kcal:145, p:5.5,c:20, f:5.0,unit:"g"},
  {id:158,name:"Пастрмалија",             cat:"🥧 Традиционални",kcal:260, p:12, c:25, f:12, unit:"g"},
  {id:159,name:"Ќебапчиња",              cat:"🥧 Традиционални",kcal:245, p:18, c:3.0,f:18, unit:"g"},
  {id:160,name:"Пататник",               cat:"🥧 Традиционални",kcal:180, p:4.5,c:25, f:7.0,unit:"g"},
  {id:161,name:"Тулумби",                cat:"🥧 Традиционални",kcal:380, p:3.5,c:52, f:18, unit:"g"},
  {id:162,name:"Баклава",                cat:"🥧 Традиционални",kcal:428, p:6.0,c:52, f:22, unit:"g"},
  {id:163,name:"Кадаиф",                 cat:"🥧 Традиционални",kcal:350, p:5.5,c:48, f:16, unit:"g"},
  {id:164,name:"Реване",                 cat:"🥧 Традиционални",kcal:320, p:5.0,c:55, f:9.0,unit:"g"},
  {id:165,name:"Хумус",                  cat:"🥧 Традиционални",kcal:166, p:7.9,c:14, f:9.6,unit:"g"},
  {id:166,name:"Гирос",                  cat:"🥧 Традиционални",kcal:220, p:16, c:18, f:9.0,unit:"g"},
  {id:167,name:"Шопска салата",          cat:"🥧 Традиционални",kcal:95,  p:4.5,c:6.0,f:6.5,unit:"g"},
  {id:168,name:"Тавче гравче",           cat:"🥧 Традиционални",kcal:142, p:8.5,c:22, f:2.8,unit:"g"},
  {id:169,name:"Мамалига",               cat:"🥧 Традиционални",kcal:95,  p:2.0,c:21, f:0.5,unit:"g"},
  {id:170,name:"Тзацики",               cat:"🥧 Традиционални",kcal:56,  p:3.0,c:4.0,f:3.0,unit:"g"},
  // 🫘 МЕШУНКИ
  {id:180,name:"Леќа кувана",            cat:"🫘 Мешунки",      kcal:116, p:9.0,c:20, f:0.4,unit:"g"},
  {id:181,name:"Наут куван",             cat:"🫘 Мешунки",      kcal:164, p:8.9,c:27, f:2.6,unit:"g"},
  {id:182,name:"Грав куван",             cat:"🫘 Мешунки",      kcal:127, p:8.7,c:23, f:0.5,unit:"g"},
  {id:183,name:"Едамаме",               cat:"🫘 Мешунки",      kcal:122, p:11, c:10, f:5.2,unit:"g"},
  {id:184,name:"Тофу",                  cat:"🫘 Мешунки",      kcal:76,  p:8.0,c:1.9,f:4.8,unit:"g"},
  {id:185,name:"Соини зрна кувани",     cat:"🫘 Мешунки",      kcal:173, p:17, c:10, f:9.0,unit:"g"},
  {id:186,name:"Грашок зелен",          cat:"🫘 Мешунки",      kcal:81,  p:5.4,c:14, f:0.4,unit:"g"},
  // 🥦 ЗЕЛЕНЧУК
  {id:200,name:"Компир куван",          cat:"🥦 Зеленчук",     kcal:86,  p:1.9,c:20, f:0.1,unit:"g"},
  {id:201,name:"Компир печен",          cat:"🥦 Зеленчук",     kcal:93,  p:2.5,c:21, f:0.1,unit:"g"},
  {id:202,name:"Компир пржен",          cat:"🥦 Зеленчук",     kcal:312, p:3.4,c:41, f:15, unit:"g"},
  {id:203,name:"Помфрит",               cat:"🥦 Зеленчук",     kcal:365, p:3.9,c:52, f:17, unit:"g"},
  {id:204,name:"Слатки компири",        cat:"🥦 Зеленчук",     kcal:86,  p:1.6,c:20, f:0.1,unit:"g"},
  {id:205,name:"Брокола",               cat:"🥦 Зеленчук",     kcal:34,  p:2.8,c:7.0,f:0.4,unit:"g"},
  {id:206,name:"Спанаќ",               cat:"🥦 Зеленчук",     kcal:23,  p:2.9,c:3.6,f:0.4,unit:"g"},
  {id:207,name:"Домати",               cat:"🥦 Зеленчук",     kcal:18,  p:0.9,c:3.9,f:0.2,unit:"g"},
  {id:208,name:"Краставица",           cat:"🥦 Зеленчук",     kcal:15,  p:0.7,c:3.6,f:0.1,unit:"g"},
  {id:209,name:"Морков",               cat:"🥦 Зеленчук",     kcal:41,  p:0.9,c:10, f:0.2,unit:"g"},
  {id:210,name:"Пиперка зелена",       cat:"🥦 Зеленчук",     kcal:20,  p:0.9,c:4.6,f:0.2,unit:"g"},
  {id:211,name:"Пиперка црвена",       cat:"🥦 Зеленчук",     kcal:31,  p:1.0,c:6.0,f:0.3,unit:"g"},
  {id:212,name:"Кромид",               cat:"🥦 Зеленчук",     kcal:40,  p:1.1,c:9.3,f:0.1,unit:"g"},
  {id:213,name:"Лук",                  cat:"🥦 Зеленчук",     kcal:149, p:6.4,c:33, f:0.5,unit:"g"},
  {id:214,name:"Карфиол",              cat:"🥦 Зеленчук",     kcal:25,  p:1.9,c:5.0,f:0.3,unit:"g"},
  {id:215,name:"Тиквички",             cat:"🥦 Зеленчук",     kcal:17,  p:1.2,c:3.1,f:0.3,unit:"g"},
  {id:216,name:"Патлиџан",             cat:"🥦 Зеленчук",     kcal:25,  p:1.0,c:6.0,f:0.2,unit:"g"},
  {id:217,name:"Зелена салата",        cat:"🥦 Зеленчук",     kcal:15,  p:1.4,c:2.9,f:0.2,unit:"g"},
  {id:218,name:"Авокадо",              cat:"🥦 Зеленчук",     kcal:160, p:2.0,c:9.0,f:15, unit:"g"},
  {id:219,name:"Пченка зрна",          cat:"🥦 Зеленчук",     kcal:86,  p:3.3,c:19, f:1.4,unit:"g"},
  {id:220,name:"Целер",                cat:"🥦 Зеленчук",     kcal:16,  p:0.7,c:3.0,f:0.2,unit:"g"},
  {id:221,name:"Печурки шампињон",     cat:"🥦 Зеленчук",     kcal:22,  p:3.1,c:3.3,f:0.3,unit:"g"},
  {id:222,name:"Олива зелена",         cat:"🥦 Зеленчук",     kcal:145, p:1.0,c:3.8,f:15, unit:"g"},
  {id:223,name:"Олива црна",           cat:"🥦 Зеленчук",     kcal:115, p:0.8,c:6.0,f:10, unit:"g"},
  {id:224,name:"Зелка",                cat:"🥦 Зеленчук",     kcal:25,  p:1.3,c:5.8,f:0.1,unit:"g"},
  {id:225,name:"Аспарагус",            cat:"🥦 Зеленчук",     kcal:20,  p:2.2,c:3.9,f:0.1,unit:"g"},
  {id:226,name:"Рукола",               cat:"🥦 Зеленчук",     kcal:25,  p:2.6,c:3.7,f:0.7,unit:"g"},
  {id:227,name:"Кисела зелка",         cat:"🥦 Зеленчук",     kcal:19,  p:0.9,c:4.3,f:0.1,unit:"g"},
  {id:228,name:"Цвекло варено",        cat:"🥦 Зеленчук",     kcal:44,  p:1.7,c:10, f:0.2,unit:"g"},
  {id:229,name:"Праз",                 cat:"🥦 Зеленчук",     kcal:61,  p:1.5,c:14, f:0.3,unit:"g"},
  {id:230,name:"Репка",                cat:"🥦 Зеленчук",     kcal:43,  p:1.6,c:10, f:0.2,unit:"g"},
  // 🍎 ОВОШЈЕ
  {id:240,name:"Банана",               cat:"🍎 Овошје",       kcal:89,  p:1.1,c:23, f:0.3,unit:"g"},
  {id:241,name:"Јаболко",              cat:"🍎 Овошје",       kcal:52,  p:0.3,c:14, f:0.2,unit:"g"},
  {id:242,name:"Портокал",             cat:"🍎 Овошје",       kcal:47,  p:0.9,c:12, f:0.1,unit:"g"},
  {id:243,name:"Мандарина",            cat:"🍎 Овошје",       kcal:53,  p:0.8,c:13, f:0.3,unit:"g"},
  {id:244,name:"Грозје бело",          cat:"🍎 Овошје",       kcal:67,  p:0.6,c:17, f:0.4,unit:"g"},
  {id:245,name:"Грозје црвено",        cat:"🍎 Овошје",       kcal:70,  p:0.7,c:18, f:0.2,unit:"g"},
  {id:246,name:"Јагоди",               cat:"🍎 Овошје",       kcal:32,  p:0.7,c:7.7,f:0.3,unit:"g"},
  {id:247,name:"Боровинки",            cat:"🍎 Овошје",       kcal:57,  p:0.7,c:14, f:0.3,unit:"g"},
  {id:248,name:"Малини",               cat:"🍎 Овошје",       kcal:52,  p:1.2,c:12, f:0.7,unit:"g"},
  {id:249,name:"Праска",               cat:"🍎 Овошје",       kcal:39,  p:0.9,c:10, f:0.3,unit:"g"},
  {id:250,name:"Слива",                cat:"🍎 Овошје",       kcal:46,  p:0.7,c:11, f:0.3,unit:"g"},
  {id:251,name:"Кајсија",              cat:"🍎 Овошје",       kcal:48,  p:1.4,c:11, f:0.4,unit:"g"},
  {id:252,name:"Цреши",                cat:"🍎 Овошје",       kcal:63,  p:1.1,c:16, f:0.2,unit:"g"},
  {id:253,name:"Диња",                 cat:"🍎 Овошје",       kcal:34,  p:0.8,c:8.2,f:0.2,unit:"g"},
  {id:254,name:"Лубеница",             cat:"🍎 Овошје",       kcal:30,  p:0.6,c:7.6,f:0.2,unit:"g"},
  {id:255,name:"Манго",                cat:"🍎 Овошје",       kcal:60,  p:0.8,c:15, f:0.4,unit:"g"},
  {id:256,name:"Ананас",               cat:"🍎 Овошје",       kcal:50,  p:0.5,c:13, f:0.1,unit:"g"},
  {id:257,name:"Киви",                 cat:"🍎 Овошје",       kcal:61,  p:1.1,c:15, f:0.5,unit:"g"},
  {id:258,name:"Смокви",               cat:"🍎 Овошје",       kcal:74,  p:0.8,c:19, f:0.3,unit:"g"},
  {id:259,name:"Суви сливи",           cat:"🍎 Овошје",       kcal:240, p:2.2,c:64, f:0.4,unit:"g"},
  {id:260,name:"Суви кајсии",          cat:"🍎 Овошје",       kcal:241, p:3.4,c:63, f:0.5,unit:"g"},
  {id:261,name:"Суво грозје",          cat:"🍎 Овошје",       kcal:299, p:3.1,c:79, f:0.5,unit:"g"},
  {id:262,name:"Урми",                 cat:"🍎 Овошје",       kcal:277, p:1.8,c:75, f:0.2,unit:"g"},
  {id:263,name:"Шипка",                cat:"🍎 Овошје",       kcal:83,  p:1.7,c:19, f:1.2,unit:"g"},
  // 🥜 ОРЕВИ
  {id:280,name:"Бадеми",               cat:"🥜 Ореви",        kcal:579, p:21, c:22, f:50, unit:"g"},
  {id:281,name:"Орев",                 cat:"🥜 Ореви",        kcal:654, p:15, c:14, f:65, unit:"g"},
  {id:282,name:"Кикиритки",            cat:"🥜 Ореви",        kcal:567, p:26, c:16, f:49, unit:"g"},
  {id:283,name:"Путер кикиритки",      cat:"🥜 Ореви",        kcal:588, p:25, c:20, f:50, unit:"g"},
  {id:284,name:"Индиски ореви",        cat:"🥜 Ореви",        kcal:553, p:18, c:30, f:44, unit:"g"},
  {id:285,name:"Лешници",              cat:"🥜 Ореви",        kcal:628, p:15, c:17, f:61, unit:"g"},
  {id:286,name:"Пистаќи",             cat:"🥜 Ореви",        kcal:560, p:20, c:28, f:45, unit:"g"},
  {id:287,name:"Семиња чиа",           cat:"🥜 Ореви",        kcal:486, p:17, c:42, f:31, unit:"g"},
  {id:288,name:"Семиња лен",           cat:"🥜 Ореви",        kcal:534, p:18, c:29, f:42, unit:"g"},
  {id:289,name:"Семиња сончоглед",     cat:"🥜 Ореви",        kcal:584, p:21, c:20, f:51, unit:"g"},
  {id:290,name:"Семиња тиква",         cat:"🥜 Ореви",        kcal:559, p:30, c:11, f:49, unit:"g"},
  {id:291,name:"Сусам",                cat:"🥜 Ореви",        kcal:573, p:17, c:23, f:50, unit:"g"},
  {id:292,name:"Тахини",               cat:"🥜 Ореви",        kcal:595, p:17, c:21, f:54, unit:"g"},
  {id:293,name:"Макадамија",           cat:"🥜 Ореви",        kcal:718, p:7.9,c:14, f:76, unit:"g"},
  // 🫙 МАСЛА
  {id:300,name:"Маслиново масло",      cat:"🫙 Масла",        kcal:884, p:0,  c:0,  f:100,unit:"ml"},
  {id:301,name:"Сончогледово масло",   cat:"🫙 Масла",        kcal:884, p:0,  c:0,  f:100,unit:"ml"},
  {id:302,name:"Кокосово масло",       cat:"🫙 Масла",        kcal:862, p:0,  c:0,  f:100,unit:"ml"},
  {id:303,name:"Маргарин",             cat:"🫙 Масла",        kcal:717, p:0.2,c:0.7,f:80, unit:"g"},
  {id:304,name:"Мајонез",              cat:"🫙 Масла",        kcal:680, p:0.9,c:0.6,f:75, unit:"g"},
  {id:305,name:"Мајонез light",        cat:"🫙 Масла",        kcal:288, p:1.0,c:9.0,f:28, unit:"g"},
  // ☕ ПИЈАЛОЦИ
  {id:320,name:"Кафе черно",           cat:"☕ Пијалоци",     kcal:2,   p:0.3,c:0,  f:0,  unit:"ml"},
  {id:321,name:"Еспресо",              cat:"☕ Пијалоци",     kcal:9,   p:0.5,c:1.5,f:0.2,unit:"ml"},
  {id:322,name:"Капучино цело млеко",  cat:"☕ Пијалоци",     kcal:54,  p:3.3,c:5.0,f:2.0,unit:"ml"},
  {id:323,name:"Лате",                 cat:"☕ Пијалоци",     kcal:54,  p:3.3,c:5.0,f:2.0,unit:"ml"},
  {id:324,name:"Чај зелен",            cat:"☕ Пијалоци",     kcal:1,   p:0,  c:0.3,f:0,  unit:"ml"},
  {id:325,name:"Портокалов сок",       cat:"☕ Пијалоци",     kcal:45,  p:0.7,c:10, f:0.2,unit:"ml"},
  {id:326,name:"Јаболков сок",         cat:"☕ Пијалоци",     kcal:46,  p:0.1,c:11, f:0.1,unit:"ml"},
  {id:327,name:"Кока-Кола",            cat:"☕ Пијалоци",     kcal:37,  p:0,  c:9.4,f:0,  unit:"ml"},
  {id:328,name:"Кока-Кола Zero",       cat:"☕ Пијалоци",     kcal:0,   p:0,  c:0,  f:0,  unit:"ml"},
  {id:329,name:"Вода",                 cat:"☕ Пијалоци",     kcal:0,   p:0,  c:0,  f:0,  unit:"ml"},
  {id:330,name:"Протеин шејк готов",   cat:"☕ Пијалоци",     kcal:42,  p:6.0,c:2.0,f:0.8,unit:"ml"},
  {id:331,name:"Смути банана-јагода",  cat:"☕ Пијалоци",     kcal:62,  p:1.5,c:13, f:0.4,unit:"ml"},
  {id:332,name:"Бира обична",          cat:"☕ Пијалоци",     kcal:43,  p:0.5,c:3.6,f:0,  unit:"ml"},
  {id:333,name:"Вино црвено",          cat:"☕ Пијалоци",     kcal:85,  p:0.1,c:2.6,f:0,  unit:"ml"},
  {id:334,name:"Вино бело",            cat:"☕ Пијалоци",     kcal:82,  p:0.1,c:2.1,f:0,  unit:"ml"},
  // 🍕 БРЗА ХРАНА
  {id:350,name:"Хамбургер обичен",     cat:"🍕 Брза храна",   kcal:295, p:17, c:24, f:14, unit:"g"},
  {id:351,name:"Чизбургер",            cat:"🍕 Брза храна",   kcal:303, p:17, c:23, f:15, unit:"g"},
  {id:352,name:"Пица Маргарита",       cat:"🍕 Брза храна",   kcal:250, p:10, c:34, f:8.5,unit:"g"},
  {id:353,name:"Пица Пепперони",       cat:"🍕 Брза храна",   kcal:298, p:12, c:34, f:12, unit:"g"},
  {id:354,name:"Сендвич шунка-сирење", cat:"🍕 Брза храна",   kcal:244, p:12, c:24, f:10, unit:"g"},
  {id:355,name:"Врап пилешки",         cat:"🍕 Брза храна",   kcal:218, p:14, c:22, f:7.5,unit:"g"},
  {id:356,name:"Чипс компир",          cat:"🍕 Брза храна",   kcal:547, p:6.6,c:52, f:35, unit:"g"},
  {id:357,name:"Донер кебап",          cat:"🍕 Брза храна",   kcal:260, p:15, c:22, f:11, unit:"g"},
  {id:358,name:"Шаурма",               cat:"🍕 Брза храна",   kcal:250, p:14, c:20, f:11, unit:"g"},
  {id:359,name:"Фалафел",              cat:"🍕 Брза храна",   kcal:333, p:13, c:32, f:18, unit:"g"},
  {id:360,name:"Тако",                 cat:"🍕 Брза храна",   kcal:218, p:9.7,c:22, f:9.8,unit:"g"},
  {id:361,name:"Бурито",               cat:"🍕 Брза храна",   kcal:209, p:9.0,c:31, f:5.9,unit:"g"},
  {id:362,name:"Суши нигири",          cat:"🍕 Брза храна",   kcal:143, p:7.5,c:24, f:1.7,unit:"g"},
  {id:363,name:"Суши маки",            cat:"🍕 Брза храна",   kcal:166, p:5.0,c:30, f:2.4,unit:"g"},
  // 🍫 СЛАТКИ
  {id:380,name:"Темно чоколадо 70%+",  cat:"🍫 Слатки",       kcal:598, p:7.8,c:46, f:43, unit:"g"},
  {id:381,name:"Млечно чоколадо",      cat:"🍫 Слатки",       kcal:535, p:8.0,c:60, f:30, unit:"g"},
  {id:382,name:"Мед",                  cat:"🍫 Слатки",       kcal:304, p:0.3,c:82, f:0,  unit:"g"},
  {id:383,name:"Шеќер бел",            cat:"🍫 Слатки",       kcal:387, p:0,  c:100,f:0,  unit:"g"},
  {id:384,name:"Нутела",               cat:"🍫 Слатки",       kcal:539, p:6.3,c:58, f:31, unit:"g"},
  {id:385,name:"Џем јагода",           cat:"🍫 Слатки",       kcal:278, p:0.4,c:69, f:0.1,unit:"g"},
  {id:386,name:"Торта чоколадна",      cat:"🍫 Слатки",       kcal:365, p:5.0,c:52, f:17, unit:"g"},
  {id:387,name:"Кекс",                 cat:"🍫 Слатки",       kcal:460, p:6.0,c:64, f:20, unit:"g"},
  {id:388,name:"Вафли",                cat:"🍫 Слатки",       kcal:435, p:6.5,c:65, f:17, unit:"g"},
  {id:389,name:"Мафин боровинки",      cat:"🍫 Слатки",       kcal:377, p:5.5,c:55, f:16, unit:"g"},
  {id:390,name:"Доната",               cat:"🍫 Слатки",       kcal:452, p:5.0,c:51, f:25, unit:"g"},
  {id:391,name:"Чизкejk",              cat:"🍫 Слатки",       kcal:321, p:5.5,c:26, f:23, unit:"g"},
  {id:392,name:"Тирамису",             cat:"🍫 Слатки",       kcal:283, p:5.0,c:23, f:19, unit:"g"},
  {id:393,name:"Палачинки со шеќер",   cat:"🍫 Слатки",       kcal:227, p:6.0,c:34, f:7.5,unit:"g"},
  {id:394,name:"Желе",                 cat:"🍫 Слатки",       kcal:80,  p:1.8,c:19, f:0,  unit:"g"},
  {id:395,name:"Сладолед чоколада",    cat:"🍫 Слатки",       kcal:216, p:3.8,c:26, f:11, unit:"g"},
  // 💊 СУПЛЕМЕНТИ
  {id:420,name:"Протеин прав Whey",    cat:"💊 Суплементи",   kcal:370, p:80, c:7.0,f:4.0,unit:"g"},
  {id:421,name:"Протеин прав Казеин",  cat:"💊 Суплементи",   kcal:350, p:78, c:5.0,f:2.0,unit:"g"},
  {id:422,name:"Протеин растителен",   cat:"💊 Суплементи",   kcal:355, p:72, c:8.0,f:5.0,unit:"g"},
  {id:423,name:"BCAA прав",            cat:"💊 Суплементи",   kcal:40,  p:10, c:0,  f:0,  unit:"g"},
  {id:424,name:"Creatin монохидрат",   cat:"💊 Суплементи",   kcal:0,   p:0,  c:0,  f:0,  unit:"g"},
  // 🥫 СОСОВИ
  {id:440,name:"Конзерва домати",      cat:"🥫 Сосови",       kcal:32,  p:1.5,c:7.0,f:0.2,unit:"g"},
  {id:441,name:"Кечап",                cat:"🥫 Сосови",       kcal:100, p:1.3,c:25, f:0.1,unit:"g"},
  {id:442,name:"Горчица",              cat:"🥫 Сосови",       kcal:60,  p:3.7,c:5.8,f:3.3,unit:"g"},
  {id:443,name:"Соен сос",             cat:"🥫 Сосови",       kcal:53,  p:8.1,c:4.9,f:0,  unit:"ml"},
  {id:444,name:"Сос за тестенини",     cat:"🥫 Сосови",       kcal:62,  p:2.0,c:9.5,f:2.0,unit:"g"},
  {id:445,name:"Доматна паста",        cat:"🥫 Сосови",       kcal:82,  p:4.3,c:19, f:0.5,unit:"g"},
  {id:446,name:"Цезар сос",            cat:"🥫 Сосови",       kcal:280, p:2.0,c:4.0,f:29, unit:"g"},
  {id:447,name:"Сос ранч",             cat:"🥫 Сосови",       kcal:297, p:1.5,c:5.2,f:30, unit:"g"},
];

// ═══════════════════════════════════════════════
// CONSTANTS & HELPERS
// ═══════════════════════════════════════════════
const CATS = [...new Set(FOOD_DB.map(f=>f.cat))];
const SURPLUS = 175;
const AC = "#c9956a";
const PROFILES_KEY = "nut_profiles_v1";
const ACTIVE_KEY   = "nut_active_v1";

function calcBMR(w,h,a,sex){
  return sex==="female"
    ? 10*w+6.25*h-5*a-161
    : 10*w+6.25*h-5*a+5;
}
function calcLBM(w,bf){ return w*(1-bf/100); }

const ACTIVITY=[
  {label:"Sedentary",         desc:"No exercise",  m:1.2},
  {label:"Lightly Active",    desc:"1-3x/week",    m:1.375},
  {label:"Moderately Active", desc:"3-5x/week",    m:1.55},
  {label:"Very Active",       desc:"6-7x/week",    m:1.725},
  {label:"Athlete",           desc:"2x/day",       m:1.9},
];

const GOALS_MAP={
  "lean_bulk": {label:"Lean Bulk",    surplus:175,  protMult:2.1},
  "bulk":      {label:"Bulk",         surplus:350,  protMult:2.0},
  "cut":       {label:"Cutting",      surplus:-400, protMult:2.4},
  "maintain":  {label:"Maintain",     surplus:0,    protMult:1.8},
  "recomp":    {label:"Recomposition",surplus:-100, protMult:2.3},
};

const AVATAR_COLORS=["#c9956a","#7ea8c9","#9c7ec9","#7ec9a0","#c97e7e","#c9c17e"];

function calcGoals(profile){
  const lbm=calcLBM(profile.weight,profile.bf);
  const bmr=calcBMR(profile.weight,profile.height,profile.age,profile.sex);
  const tdee=bmr*ACTIVITY[profile.actIdx].m;
  const gk=GOALS_MAP[profile.goal]||GOALS_MAP.lean_bulk;
  const cal=Math.round(tdee+gk.surplus);
  const prot=Math.round(lbm*gk.protMult);
  const fatG=Math.round(Math.abs(cal)*0.25/9);
  const carb=Math.round((cal-prot*4-fatG*9)/4);
  return{cal,prot,carbs:Math.max(0,carb),fat:fatG,lbm:Math.round(lbm*10)/10,bmr:Math.round(bmr),tdee:Math.round(tdee)};
}

function todayStr(){ return new Date().toDateString(); }

function loadProfiles(){
  try{ return JSON.parse(localStorage.getItem(PROFILES_KEY)||"[]"); }
  catch{ return []; }
}
function saveProfiles(profiles){
  try{ localStorage.setItem(PROFILES_KEY,JSON.stringify(profiles)); }catch{}
}
function loadActiveId(){
  try{ return localStorage.getItem(ACTIVE_KEY)||null; }catch{ return null; }
}
function saveActiveId(id){
  try{ localStorage.setItem(ACTIVE_KEY,id); }catch{}
}

// ═══════════════════════════════════════════════
// PROFILE FORM
// ═══════════════════════════════════════════════
function ProfileForm({initial,onSave,onCancel,isNew}){
  const [form,setForm]=useState(initial||{
    name:"",age:"",weight:"",height:"",bf:"",sex:"female",
    goal:"lean_bulk",actIdx:2,color:AVATAR_COLORS[0],
  });
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const valid=form.name.trim()&&+form.age>0&&+form.weight>0&&+form.height>0&&+form.bf>=0&&+form.bf<=50;

  return(
    <div style={{background:"#fff",borderRadius:"20px",padding:"24px",boxShadow:"0 4px 24px rgba(0,0,0,0.10)"}}>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",fontWeight:"300",color:"#2a1a10",marginBottom:"4px",fontStyle:"italic"}}>
        {isNew?"Нов профил":"Уреди профил"}
      </div>
      <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"20px"}}>ВНЕСИ ГИ ТВОИТЕ ПОДАТОЦИ</div>

      {/* Avatar color */}
      <div style={{marginBottom:"16px"}}>
        <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"8px"}}>БОЈА НА ПРОФИЛ</div>
        <div style={{display:"flex",gap:"10px"}}>
          {AVATAR_COLORS.map(c=>(
            <button key={c} onClick={()=>set("color",c)} style={{width:32,height:32,borderRadius:"50%",background:c,border:form.color===c?"3px solid #2a1a10":"3px solid transparent",cursor:"pointer",transition:"all 0.2s"}}/>
          ))}
        </div>
      </div>

      {/* Name */}
      <div style={{marginBottom:"12px"}}>
        <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"5px"}}>IME *</div>
        <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Марија, Антонио, Николче..." style={{width:"100%",background:"#f9f6f3",border:"1px solid #ede5df",borderRadius:"10px",padding:"10px 12px",color:"#2a1a10",fontSize:"14px",outline:"none",fontFamily:"'DM Mono',monospace",boxSizing:"border-box"}}/>
      </div>

      {/* Sex */}
      <div style={{marginBottom:"12px"}}>
        <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"5px"}}>ПОЛ *</div>
        <div style={{display:"flex",gap:"8px"}}>
          {[["female","♀ Женски"],["male","♂ Машки"]].map(([v,l])=>(
            <button key={v} onClick={()=>set("sex",v)} style={{flex:1,padding:"10px",background:form.sex===v?"#fff4ee":"#f9f6f3",border:`1px solid ${form.sex===v?AC+"80":"#ede5df"}`,borderRadius:"10px",color:form.sex===v?AC:"#8c7b72",cursor:"pointer",fontSize:"12px",fontFamily:"'DM Mono',monospace"}}>{l}</button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"12px"}}>
        {[["age","Возраст (год)","23"],["weight","Тежина (kg)","63"],["height","Висина (cm)","171"],["bf","Body Fat (%)","20"]].map(([k,l,ph])=>(
          <div key={k}>
            <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"5px"}}>{l} *</div>
            <input type="number" value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} style={{width:"100%",background:"#f9f6f3",border:"1px solid #ede5df",borderRadius:"10px",padding:"10px 12px",color:"#2a1a10",fontSize:"14px",outline:"none",fontFamily:"'DM Mono',monospace",boxSizing:"border-box"}}/>
          </div>
        ))}
      </div>

      {/* Goal */}
      <div style={{marginBottom:"12px"}}>
        <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"8px"}}>ЦЕЛ</div>
        <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
          {Object.entries(GOALS_MAP).map(([k,g])=>(
            <button key={k} onClick={()=>set("goal",k)} style={{background:form.goal===k?"#fff4ee":"#f9f6f3",border:`1px solid ${form.goal===k?AC+"70":"#ede5df"}`,borderRadius:"8px",padding:"8px 12px",display:"flex",justifyContent:"space-between",cursor:"pointer",textAlign:"left"}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"13px",color:form.goal===k?"#2a1a10":"#8c7b72"}}>{g.label}</span>
              <span style={{fontSize:"10px",color:form.goal===k?AC:"#c4b0a4"}}>{g.surplus>0?"+":""}{g.surplus} kcal</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div style={{marginBottom:"20px"}}>
        <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"8px"}}>АКТИВНОСТ</div>
        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
          {ACTIVITY.map((a,i)=>(
            <button key={i} onClick={()=>set("actIdx",i)} style={{background:form.actIdx===i?"#fff4ee":"#f9f6f3",border:`1px solid ${form.actIdx===i?AC+"70":"#ede5df"}`,borderRadius:"8px",padding:"7px 12px",display:"flex",justifyContent:"space-between",cursor:"pointer",textAlign:"left"}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"13px",color:form.actIdx===i?"#2a1a10":"#8c7b72"}}>{a.label}</span>
              <span style={{fontSize:"10px",color:form.actIdx===i?AC:"#c4b0a4"}}>x{a.m}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{display:"flex",gap:"10px"}}>
        {onCancel&&<button onClick={onCancel} style={{flex:1,background:"transparent",border:"1px solid #ede5df",borderRadius:"12px",padding:"12px",fontSize:"12px",color:"#8c7b72",cursor:"pointer",fontFamily:"'DM Mono',monospace"}}>Откажи</button>}
        <button onClick={()=>valid&&onSave(form)} style={{flex:2,background:valid?AC:"#e0d8d2",border:"none",borderRadius:"12px",padding:"12px",fontSize:"12px",color:"#fff",cursor:valid?"pointer":"not-allowed",fontFamily:"'DM Mono',monospace",fontWeight:"500",boxShadow:valid?`0 3px 10px ${AC}50`:"none",transition:"all 0.2s"}}>
          {isNew?"Создади профил":"Зачувај промени"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App(){
  const [profiles,setProfiles]=useState(()=>loadProfiles());
  const [activeId,setActiveId]=useState(()=>loadActiveId());
  const [screen,setScreen]=useState(null); // null=tracker, "select"=choose profile, "new"=create, "edit"=edit

  // Tracker state
  const [log,setLog]=useState([]);
  const [search,setSearch]=useState("");
  const [selCat,setSelCat]=useState("sve");
  const [tab,setTab]=useState("log");
  const [selFood,setSelFood]=useState(null);
  const [qty,setQty]=useState("100");

  const activeProfile=profiles.find(p=>p.id===activeId)||null;

  // On mount / profile change: load log, check date reset
  useEffect(()=>{
    if(!activeProfile)return;
    const logKey=`nut_log_${activeProfile.id}`;
    const dateKey=`nut_date_${activeProfile.id}`;
    const today=todayStr();
    try{
      const savedDate=localStorage.getItem(dateKey);
      if(savedDate!==today){
        localStorage.setItem(dateKey,today);
        localStorage.removeItem(logKey);
        setLog([]);
      } else {
        setLog(JSON.parse(localStorage.getItem(logKey)||"[]"));
      }
    }catch{setLog([]);}
    const iv=setInterval(()=>{
      const now=new Date();
      if(now.getHours()===0&&now.getMinutes()===0){
        try{localStorage.setItem(dateKey,now.toDateString());localStorage.removeItem(logKey);}catch{}
        setLog([]);
      }
    },60000);
    return()=>clearInterval(iv);
  },[activeId]);

  // Save log
  useEffect(()=>{
    if(!activeProfile)return;
    try{localStorage.setItem(`nut_log_${activeProfile.id}`,JSON.stringify(log));}catch{}
  },[log,activeId]);

  // Save profiles
  useEffect(()=>{ saveProfiles(profiles); },[profiles]);
  useEffect(()=>{ if(activeId) saveActiveId(activeId); },[activeId]);

  // If no profiles, show create screen
  useEffect(()=>{
    if(profiles.length===0) setScreen("new");
    else if(!activeId||!profiles.find(p=>p.id===activeId)){
      setActiveId(profiles[0].id);
      saveActiveId(profiles[0].id);
    }
  },[profiles]);

  function createProfile(form){
    const id="p_"+Date.now();
    const newP={...form,id,age:+form.age,weight:+form.weight,height:+form.height,bf:+form.bf,actIdx:+form.actIdx};
    const updated=[...profiles,newP];
    setProfiles(updated);
    setActiveId(id);
    saveActiveId(id);
    setScreen(null);
    setTab("log");
    setLog([]);
  }

  function updateProfile(form){
    const updated=profiles.map(p=>p.id===activeId?{...form,id:activeId,age:+form.age,weight:+form.weight,height:+form.height,bf:+form.bf,actIdx:+form.actIdx}:p);
    setProfiles(updated);
    setScreen(null);
  }

  function deleteProfile(id){
    const updated=profiles.filter(p=>p.id!==id);
    setProfiles(updated);
    if(activeId===id){
      const next=updated[0]||null;
      setActiveId(next?.id||null);
      if(next) saveActiveId(next.id);
      else{ setScreen("new"); }
    }
  }

  function switchProfile(id){
    setActiveId(id);
    saveActiveId(id);
    setScreen(null);
    setTab("log");
    setSearch("");
    setSelFood(null);
  }

  const goals=activeProfile?calcGoals(activeProfile):null;
  const logged=activeProfile?{
    cal:  Math.round(log.reduce((s,e)=>s+e.kcal,0)),
    prot: Math.round(log.reduce((s,e)=>s+e.p,0)*10)/10,
    carbs:Math.round(log.reduce((s,e)=>s+e.c,0)*10)/10,
    fat:  Math.round(log.reduce((s,e)=>s+e.f,0)*10)/10,
  }:null;
  const rem=goals&&logged?goals.cal-logged.cal:0;

  const filtered=FOOD_DB.filter(f=>{
    const inCat=selCat==="sve"||f.cat===selCat;
    const q=search.trim().toLowerCase();
    return inCat&&(!q||f.name.toLowerCase().includes(q));
  });

  function addToLog(){
    if(!selFood||!qty||isNaN(+qty)||+qty<=0)return;
    const r=+qty/100;
    setLog(prev=>[...prev,{
      id:Date.now(),
      name:`${selFood.name} (${qty}${selFood.unit})`,
      kcal:Math.round(selFood.kcal*r),
      p:Math.round(selFood.p*r*10)/10,
      c:Math.round(selFood.c*r*10)/10,
      f:Math.round(selFood.f*r*10)/10,
      time:new Date().toLocaleTimeString("mk-MK",{hour:"2-digit",minute:"2-digit"}),
    }]);
    setSelFood(null);setQty("100");setTab("log");
  }

  function MacroBar({label,grams,kcal,color,pct}){
    const [a,setA]=useState(false);
    useEffect(()=>{setTimeout(()=>setA(true),300);},[]);
    return(
      <div style={{marginBottom:"13px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:"#8c7b72"}}>{label}</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"#2a1a10"}}>{grams}g <span style={{color:"#b8a89a",fontSize:"10px"}}>/ {kcal}kcal</span></span>
        </div>
        <div style={{height:"5px",background:"#ede5df",borderRadius:"3px",overflow:"hidden"}}>
          <div style={{height:"100%",width:a?`${Math.min(pct,100)}%`:"0%",background:color,borderRadius:"3px",transition:"width 1s cubic-bezier(0.34,1.56,0.64,1)"}}/>
        </div>
      </div>
    );
  }

  function Ring({cur,max,color,label,unit}){
    const pct=Math.min(max>0?(cur/max)*100:0,100);
    const r=26;const circ=2*Math.PI*r;
    return(
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",flex:1}}>
        <div style={{position:"relative",width:64,height:64}}>
          <svg width="64" height="64" style={{transform:"rotate(-90deg)"}}>
            <circle cx="32" cy="32" r={r} fill="none" stroke="#f0ebe6" strokeWidth="6"/>
            <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6"
              strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)}
              strokeLinecap="round" style={{transition:"stroke-dashoffset 0.8s ease"}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:"12px",color:"#2a1a10",fontWeight:"600",lineHeight:1}}>{Math.round(cur)}</span>
            <span style={{fontSize:"8px",color:"#c4b0a4"}}>/{max}{unit}</span>
          </div>
        </div>
        <span style={{fontSize:"9px",color:"#8c7b72"}}>{label}</span>
      </div>
    );
  }

  // ─── SCREEN: SELECT PROFILE ───
  if(screen==="select"){
    return(
      <div style={{minHeight:"100vh",background:"#f9f6f3",fontFamily:"'DM Mono',monospace",padding:"0"}}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>
        <div style={{background:"#fff",borderBottom:"1px solid #ede5df",padding:"24px 20px",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"11px",letterSpacing:"4px",color:"#a89080",textTransform:"uppercase",marginBottom:"4px"}}>Nutrition Tracker</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",fontStyle:"italic",fontWeight:"300",color:"#2a1a10"}}>Кој сте вие?</div>
        </div>
        <div style={{padding:"20px",maxWidth:"440px",margin:"0 auto"}}>
          {profiles.map(p=>{
            const g=calcGoals(p);
            return(
              <button key={p.id} onClick={()=>switchProfile(p.id)} style={{width:"100%",background:"#fff",border:`2px solid ${activeId===p.id?p.color:"#ede5df"}`,borderRadius:"16px",padding:"16px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"14px",cursor:"pointer",textAlign:"left",boxShadow:activeId===p.id?`0 4px 16px ${p.color}30`:"0 1px 4px rgba(0,0,0,0.04)",transition:"all 0.2s"}}>
                <div style={{width:48,height:48,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 2px 8px ${p.color}50`}}>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"20px",fontStyle:"italic",color:"#fff",fontWeight:"300"}}>{p.name[0]}</span>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",fontWeight:"400",color:"#2a1a10",lineHeight:1}}>{p.name}</div>
                  <div style={{fontSize:"9px",color:"#a89080",marginTop:"3px"}}>{p.age}г · {p.weight}кг · {p.height}цм · {p.bf}% BF</div>
                  <div style={{fontSize:"9px",color:p.color,marginTop:"2px"}}>{GOALS_MAP[p.goal]?.label} · {g.cal} kcal/ден</div>
                </div>
                {activeId===p.id&&<div style={{width:8,height:8,borderRadius:"50%",background:p.color,boxShadow:`0 0 6px ${p.color}`}}/>}
              </button>
            );
          })}
          <button onClick={()=>setScreen("new")} style={{width:"100%",background:"#fff4ee",border:`1px dashed ${AC}60`,borderRadius:"16px",padding:"16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",cursor:"pointer",color:AC,fontSize:"12px",fontFamily:"'DM Mono',monospace"}}>
            <span style={{fontSize:"18px"}}>+</span> Нов профил
          </button>
          {activeProfile&&<button onClick={()=>setScreen(null)} style={{width:"100%",background:"transparent",border:"none",padding:"16px",color:"#a89080",fontSize:"11px",cursor:"pointer",fontFamily:"'DM Mono',monospace",marginTop:"4px"}}>← Назад</button>}
        </div>
      </div>
    );
  }

  // ─── SCREEN: CREATE NEW ───
  if(screen==="new"){
    return(
      <div style={{minHeight:"100vh",background:"#f9f6f3",fontFamily:"'DM Mono',monospace",padding:"20px"}}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>
        <div style={{maxWidth:"440px",margin:"0 auto"}}>
          <ProfileForm isNew onSave={createProfile} onCancel={profiles.length>0?()=>setScreen("select"):null}/>
        </div>
      </div>
    );
  }

  // ─── SCREEN: EDIT PROFILE ───
  if(screen==="edit"&&activeProfile){
    return(
      <div style={{minHeight:"100vh",background:"#f9f6f3",fontFamily:"'DM Mono',monospace",padding:"20px"}}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>
        <div style={{maxWidth:"440px",margin:"0 auto"}}>
          <ProfileForm initial={activeProfile} onSave={updateProfile} onCancel={()=>setScreen(null)}/>
          <button onClick={()=>{if(confirm(`Избриши го профилот за ${activeProfile.name}?`)){deleteProfile(activeProfile.id);setScreen(null);}}} style={{width:"100%",marginTop:"12px",background:"transparent",border:"1px solid #f0c0c0",borderRadius:"12px",padding:"12px",fontSize:"11px",color:"#c97a6a",cursor:"pointer",fontFamily:"'DM Mono',monospace"}}>
            🗑 Избриши профил
          </button>
        </div>
      </div>
    );
  }

  // ─── MAIN TRACKER ───
  if(!activeProfile) return null;
  const ac=activeProfile.color||AC;

  return(
    <div style={{minHeight:"100vh",background:"#f9f6f3",fontFamily:"'DM Mono',monospace",color:"#2a1a10",paddingBottom:"80px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <div style={{background:"#fff",borderBottom:"1px solid #ede5df",padding:"14px 16px 0",position:"sticky",top:0,zIndex:20,boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",maxWidth:"440px",margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            {/* Avatar */}
            <button onClick={()=>setScreen("select")} style={{width:40,height:40,borderRadius:"50%",background:ac,border:`2px solid ${ac}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 2px 8px ${ac}50`,padding:0}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"18px",fontStyle:"italic",color:"#fff",fontWeight:"300"}}>{activeProfile.name[0]}</span>
            </button>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"20px",fontStyle:"italic",fontWeight:"300",color:"#2a1a10",lineHeight:1}}>{activeProfile.name}</div>
                <button onClick={()=>setScreen("edit")} style={{background:"transparent",border:"none",fontSize:"11px",color:"#c4b0a4",cursor:"pointer",padding:"0 2px"}}>✎</button>
              </div>
              <div style={{fontSize:"8px",color:"#a89080",letterSpacing:"1px"}}>{GOALS_MAP[activeProfile.goal]?.label?.toUpperCase()} · {new Date().toLocaleDateString("mk-MK")}</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:"8px",color:"#a89080",marginBottom:"1px"}}>ОСТАНАТО</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"22px",fontWeight:"300",color:rem>=0?ac:"#c97a6a",lineHeight:1}}>{Math.abs(rem)}</div>
            <div style={{fontSize:"8px",color:"#a89080"}}>{rem>=0?"kcal":"kcal повеќе"}</div>
          </div>
        </div>
        <div style={{display:"flex",maxWidth:"440px",margin:"10px auto 0",borderTop:"1px solid #f0ebe6"}}>
          {[["log","📋 Дневник"],["add","➕ Додај"],["stats","📊 Цели"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 4px",border:"none",background:"transparent",color:tab===t?"#2a1a10":"#b8a89a",fontSize:"10px",cursor:"pointer",fontFamily:"'DM Mono',monospace",borderBottom:tab===t?`2px solid ${ac}`:"2px solid transparent",transition:"all 0.2s"}}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:"440px",margin:"0 auto",padding:"14px 14px 0"}}>

        {/* ── TAB: ДНЕВНИК ── */}
        {tab==="log"&&goals&&logged&&(
          <>
            <div style={{background:"#fff",border:"1px solid #ede5df",borderRadius:"16px",padding:"16px",marginBottom:"12px",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",gap:"6px",justifyContent:"space-between"}}>
                <Ring cur={logged.cal}   max={goals.cal}   color={ac}      label="Калории" unit=""/>
                <Ring cur={logged.prot}  max={goals.prot}  color="#c9956a" label="Протеин" unit="g"/>
                <Ring cur={logged.carbs} max={goals.carbs} color="#7ea8c9" label="Јаглех." unit="g"/>
                <Ring cur={logged.fat}   max={goals.fat}   color="#9c7ec9" label="Масти"   unit="g"/>
              </div>
            </div>
            <div style={{background:"#fff",border:"1px solid #ede5df",borderRadius:"16px",padding:"16px",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",letterSpacing:"3px",color:"#a89080",textTransform:"uppercase"}}>Денес · {log.length} оброци</div>
                {log.length>0&&<button onClick={()=>setLog([])} style={{background:"transparent",border:"1px solid #ede5df",borderRadius:"6px",padding:"3px 8px",fontSize:"9px",color:"#c4b0a4",cursor:"pointer"}}>РЕСЕТ</button>}
              </div>
              {log.length===0?(
                <div style={{textAlign:"center",padding:"24px 0",color:"#c4b0a4"}}>
                  <div style={{fontSize:"32px",marginBottom:"8px"}}>🍽️</div>
                  <div style={{fontSize:"11px"}}>Нема внесено оброци</div>
                  <button onClick={()=>setTab("add")} style={{marginTop:"12px",background:"#fff4ee",border:`1px solid ${ac}40`,borderRadius:"10px",padding:"8px 16px",fontSize:"11px",color:ac,cursor:"pointer",fontFamily:"'DM Mono',monospace"}}>+ Додај прв оброк</button>
                </div>
              ):(
                <>
                  {log.map(e=>(
                    <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #f5f0ec"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:"12px",color:"#2a1a10",marginBottom:"2px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.name}</div>
                        <div style={{fontSize:"9px",color:"#c4b0a4"}}>{e.time} · П:{e.p}g · Ј:{e.c}g · М:{e.f}g</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginLeft:"8px"}}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:"13px",color:ac,fontWeight:"500",whiteSpace:"nowrap"}}>{e.kcal} kcal</span>
                        <button onClick={()=>setLog(p=>p.filter(x=>x.id!==e.id))} style={{background:"transparent",border:"none",color:"#d0c0b8",cursor:"pointer",fontSize:"16px",lineHeight:1,padding:"0",flexShrink:0}}>×</button>
                      </div>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",paddingTop:"10px"}}>
                    <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"11px",color:"#8c7b72",letterSpacing:"1px"}}>ВКУПНО</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:"13px",color:"#2a1a10",fontWeight:"600"}}>{logged.cal} kcal</span>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* ── TAB: ДОДАЈ ── */}
        {tab==="add"&&(
          <>
            {selFood?(
              <div style={{background:"#fff8f4",border:`1px solid ${ac}40`,borderRadius:"16px",padding:"16px",marginBottom:"12px",boxShadow:`0 2px 12px ${ac}15`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                  <div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"17px",color:"#2a1a10",fontWeight:"500"}}>{selFood.name}</div>
                    <div style={{fontSize:"9px",color:"#a89080",marginTop:"2px"}}>{selFood.cat} · {selFood.kcal}kcal/100{selFood.unit}</div>
                  </div>
                  <button onClick={()=>setSelFood(null)} style={{background:"transparent",border:"none",color:"#c4b0a4",fontSize:"20px",cursor:"pointer",lineHeight:1}}>×</button>
                </div>
                <div style={{marginBottom:"12px"}}>
                  <div style={{fontSize:"10px",color:"#a89080",letterSpacing:"1px",marginBottom:"6px"}}>КОЛИЧИНА ({selFood.unit})</div>
                  <div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
                    <input type="number" value={qty} onChange={e=>setQty(e.target.value)}
                      style={{width:"80px",background:"#fff",border:`1.5px solid ${ac}60`,borderRadius:"10px",padding:"9px 12px",color:"#2a1a10",fontSize:"16px",outline:"none",fontFamily:"'DM Mono',monospace",fontWeight:"600",textAlign:"center"}}/>
                    <span style={{fontSize:"12px",color:"#a89080"}}>{selFood.unit}</span>
                    {(selFood.unit==="ml"?[100,200,250,330,500]:[25,50,100,150,200,300]).map(v=>(
                      <button key={v} onClick={()=>setQty(String(v))} style={{background:qty===String(v)?"#fff4ee":"#f9f6f3",border:`1px solid ${qty===String(v)?ac+"60":"#ede5df"}`,borderRadius:"8px",padding:"5px 9px",fontSize:"10px",color:qty===String(v)?ac:"#8c7b72",cursor:"pointer"}}>{v}</button>
                    ))}
                  </div>
                </div>
                {qty&&!isNaN(+qty)&&+qty>0&&(()=>{
                  const r=+qty/100;
                  return(
                    <div>
                      <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>
                        {[[`${Math.round(selFood.kcal*r)}kcal`,"Калории",ac],[`${Math.round(selFood.p*r*10)/10}g`,"Протеин","#c9956a"],[`${Math.round(selFood.c*r*10)/10}g`,"Јаглех.","#7ea8c9"],[`${Math.round(selFood.f*r*10)/10}g`,"Масти","#9c7ec9"]].map(([v,l,c])=>(
                          <div key={l} style={{flex:1,background:"#fff",borderRadius:"10px",padding:"8px 4px",textAlign:"center",border:`1px solid ${c}25`}}>
                            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:c,fontWeight:"600"}}>{v}</div>
                            <div style={{fontSize:"8px",color:"#c4b0a4",marginTop:"2px"}}>{l}</div>
                          </div>
                        ))}
                      </div>
                      <button onClick={addToLog} style={{width:"100%",background:ac,border:"none",borderRadius:"12px",padding:"12px",fontSize:"12px",color:"#fff",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:"500",boxShadow:`0 3px 10px ${ac}50`}}>
                        + Додај во дневник
                      </button>
                    </div>
                  );
                })()}
              </div>
            ):(
              <div style={{background:"#fff8f4",border:`1px solid ${ac}30`,borderRadius:"12px",padding:"11px 14px",marginBottom:"12px",fontSize:"11px",color:"#8c7b72",display:"flex",alignItems:"center",gap:"8px"}}>
                <span style={{fontSize:"16px"}}>👆</span> Избери намирница подолу
              </div>
            )}
            <div style={{background:"#fff",border:"1px solid #ede5df",borderRadius:"12px",padding:"10px",marginBottom:"8px"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder={`Пребарај меѓу ${FOOD_DB.length} намирници...`}
                style={{width:"100%",background:"#f9f6f3",border:"1px solid #ede5df",borderRadius:"8px",padding:"9px 12px",color:"#2a1a10",fontSize:"12px",outline:"none",fontFamily:"'DM Mono',monospace",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"flex",gap:"6px",overflowX:"auto",marginBottom:"8px",paddingBottom:"2px",WebkitOverflowScrolling:"touch"}}>
              {[["sve","🍽️ Сè"],...CATS.map(c=>[c,c])].map(([k,label])=>(
                <button key={k} onClick={()=>setSelCat(k)} style={{flexShrink:0,background:selCat===k?"#fff4ee":"#fff",border:`1px solid ${selCat===k?ac+"60":"#ede5df"}`,borderRadius:"20px",padding:"5px 11px",fontSize:"10px",color:selCat===k?ac:"#8c7b72",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"'DM Mono',monospace"}}>{label}</button>
              ))}
            </div>
            <div style={{background:"#fff",border:"1px solid #ede5df",borderRadius:"14px",overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
              <div style={{padding:"8px 14px",background:"#f9f6f3",borderBottom:"1px solid #ede5df",fontSize:"9px",color:"#a89080",letterSpacing:"1px"}}>{filtered.length} НАМИРНИЦИ</div>
              {filtered.length===0?(
                <div style={{padding:"24px",textAlign:"center",color:"#c4b0a4",fontSize:"11px"}}>Нема резултати</div>
              ):filtered.map((f,i)=>(
                <button key={f.id} onClick={()=>{setSelFood(f);setQty("100");}} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:selFood?.id===f.id?"#fff8f4":"transparent",border:"none",borderBottom:i<filtered.length-1?"1px solid #f5f0ec":"none",cursor:"pointer",textAlign:"left",transition:"background 0.15s"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:"12px",color:selFood?.id===f.id?ac:"#2a1a10",fontFamily:"'DM Mono',monospace",marginBottom:"1px"}}>{f.name}</div>
                    <div style={{fontSize:"9px",color:"#c4b0a4"}}>П:{f.p}g · Ј:{f.c}g · М:{f.f}g / 100{f.unit}</div>
                  </div>
                  <div style={{textAlign:"right",marginLeft:"10px",flexShrink:0}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:"13px",color:ac,fontWeight:"500"}}>{f.kcal}</div>
                    <div style={{fontSize:"8px",color:"#c4b0a4"}}>kcal</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── TAB: ЦЕЛИ ── */}
        {tab==="stats"&&goals&&(
          <>
            <div style={{display:"flex",gap:"8px",marginBottom:"12px"}}>
              {[["Возраст",activeProfile.age,"г"],["Тежина",activeProfile.weight,"кг"],["Висина",activeProfile.height,"цм"],["LBM",goals.lbm,"кг"]].map(([l,v,u])=>(
                <div key={l} style={{background:"#fff",border:"1px solid #e8ddd5",borderRadius:"12px",padding:"10px",flex:1,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"9px",letterSpacing:"2px",color:"#a89080",textTransform:"uppercase"}}>{l}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"15px",color:"#2a1a10",fontWeight:"600",marginTop:"2px"}}>{v}<span style={{fontSize:"9px",color:"#a89080",marginLeft:"1px"}}>{u}</span></div>
                </div>
              ))}
            </div>

            <div style={{background:"#fff",border:"1px solid #ede5df",borderRadius:"16px",padding:"18px",marginBottom:"12px",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",letterSpacing:"3px",color:"#a89080",textTransform:"uppercase",marginBottom:"6px"}}>Дневна цел · {GOALS_MAP[activeProfile.goal]?.label}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:"6px",marginBottom:"4px"}}>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"44px",fontWeight:"300",color:"#2a1a10",lineHeight:1}}>{goals.cal}</span>
                <span style={{fontSize:"12px",color:"#a89080"}}>kcal/ден</span>
              </div>
              <div style={{fontSize:"10px",color:"#c4b0a4",marginBottom:"16px"}}>BMR {goals.bmr} · TDEE {goals.tdee} · {GOALS_MAP[activeProfile.goal]?.surplus>=0?"+":{...{}}.x||""}{GOALS_MAP[activeProfile.goal]?.surplus} kcal</div>
              <MacroBar label="Протеин"      grams={goals.prot}  kcal={goals.prot*4}  color="#c9956a" pct={(goals.prot*4/Math.abs(goals.cal))*100}/>
              <MacroBar label="Јаглехидрати" grams={goals.carbs} kcal={goals.carbs*4} color="#7ea8c9" pct={(goals.carbs*4/Math.abs(goals.cal))*100}/>
              <MacroBar label="Масти"        grams={goals.fat}   kcal={goals.fat*9}   color="#9c7ec9" pct={(goals.fat*9/Math.abs(goals.cal))*100}/>
            </div>

            <div style={{background:"#fff",border:"1px solid #f0e0d0",borderRadius:"14px",padding:"16px",marginBottom:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",letterSpacing:"3px",color:"#a89080",textTransform:"uppercase",marginBottom:"4px"}}>Дневен протеин</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"36px",fontWeight:"300",color:ac,lineHeight:1}}>{goals.prot}<span style={{fontSize:"14px",color:"#a89080",marginLeft:"4px"}}>g</span></div>
                <div style={{fontSize:"9px",color:"#c4b0a4",marginTop:"3px"}}>{GOALS_MAP[activeProfile.goal]?.protMult}g x {goals.lbm}kg LBM</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:"9px",color:"#c4b0a4",marginBottom:"3px"}}>По оброк (4x)</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"20px",color:"#8c7b72"}}>{Math.round(goals.prot/4)}<span style={{fontSize:"9px"}}>g</span></div>
              </div>
            </div>

            <button onClick={()=>setScreen("edit")} style={{width:"100%",background:"#fff",border:`1px solid ${ac}40`,borderRadius:"14px",padding:"14px",fontSize:"12px",color:ac,cursor:"pointer",fontFamily:"'DM Mono',monospace",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
              ✎ Уреди профил за {activeProfile.name}
            </button>

            <button onClick={()=>setScreen("select")} style={{width:"100%",background:"#fff",border:"1px solid #ede5df",borderRadius:"14px",padding:"14px",fontSize:"12px",color:"#8c7b72",cursor:"pointer",fontFamily:"'DM Mono',monospace",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
              👥 Промени профил ({profiles.length} профили)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
