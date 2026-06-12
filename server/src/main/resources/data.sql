-- 초기 메뉴 데이터 (ui/src/data/menuData.js 기준)

INSERT INTO menus (kr_name, image, bg_color,
    name_ko, name_en, name_ja, name_zh,
    desc_ko, desc_en, desc_ja, desc_zh,
    price,
    is_vegan, is_no_pork, is_beef, is_spicy, is_popular,
    allergens, enabled)
VALUES
(
    '참치김밥', '/images/참치김밥.png', '#E3F2FD',
    '참치김밥', 'Tuna Gimbap', 'ツナキンパ', '金枪鱼紫菜包饭',
    '참치와 채소가 들어간 담백한 인기 김밥',
    'Popular gimbap with tuna and vegetables',
    'ツナと野菜入りの食べやすい人気キンパ',
    '金枪鱼和蔬菜制成的清淡人气紫菜包饭',
    5000,
    false, true, false, false, true,
    'Fish,Egg', true
),
(
    '새우롤김밥', '/images/새우롤김밥.png', '#FFE0B2',
    '새우롤김밥', 'Shrimp Roll Gimbap', 'エビフライロールキンパ', '炸虾卷紫菜包饭',
    '바삭한 새우튀김이 들어간 김밥',
    'Gimbap with crispy fried shrimp',
    'サクサクのエビフライ入りキンパ',
    '加入酥脆炸虾的紫菜包饭',
    5500,
    false, true, false, false, false,
    'Shellfish,Egg', true
),
(
    '돈카츠 김밥', '/images/돈카츠김밥.png', '#FFF3E0',
    '돈카츠 김밥', 'Tonkatsu Gimbap', 'とんかつキンパ', '炸猪排紫菜包饭',
    '바삭한 돈카츠가 들어간 든든한 김밥',
    'Hearty gimbap with crispy pork cutlet',
    'サクサクのとんかつ入りキンパ',
    '加入酥脆炸猪排的紫菜包饭',
    5500,
    false, false, false, false, false,
    'Egg', true
),
(
    '갈비탕', '/images/갈비탕.png', '#FBE9E7',
    '갈비탕', 'Beef Short Rib Soup', 'カルビタン', '牛排骨汤',
    '맵지 않은 맑은 소갈비탕',
    'Clear and mild beef short rib soup',
    '辛くない澄んだ牛カルビスープ',
    '不辣的清淡牛排骨汤',
    9500,
    false, true, true, false, false,
    '', true
),
(
    '비빔밥', '/images/비빔밥.png', '#E8F5E9',
    '비빔밥', 'Bibimbap', 'ビビンバ', '韩式拌饭',
    '채소와 밥을 고추장에 비벼 먹는 대표 한식',
    'Korean rice bowl with vegetables and gochujang',
    '野菜とご飯を混ぜて食べる韓国料理',
    '蔬菜和米饭拌辣椒酱的韩国代表料理',
    8000,
    false, true, false, true, true,
    'Egg', true
);
