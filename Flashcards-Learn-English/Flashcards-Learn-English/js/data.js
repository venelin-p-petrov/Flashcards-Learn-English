/// <reference path="viewModels.js" />
(function () {
    var animals = new Models.SetModel("Животни", "/images/animals.jpg");
    animals.deckNumber = 5;
    animals.decks[0].addCard(new Models.CardModel(
        "слон",
        "Elephant",
        "Either of two very large herbivorous mammals, Elephas maximus of south-central Asia or Loxodonta africana of Africa, having thick, almost hairless skin, a long, flexible, prehensile trunk, upper incisors forming long curved tusks of ivory, and, in the African species, large fan-shaped ears.",
        "noun",
        "(ĕlˈə-fənt)"));
    animals.decks[0].addCard(new Models.CardModel(
        "куче",
        "Dog",
        "A domesticated carnivorous mammal (Canis familiaris) related to the foxes and wolves and raised in a wide variety of breeds.",
        "noun",
        "(dŏg)"));
    animals.decks[0].addCard(new Models.CardModel(
        "кон",
        "Horse",
        "A large hoofed mammal (Equus caballus) having a short-haired coat, a long mane, and a long tail, domesticated since ancient times and used for riding and for drawing or carrying loads.",
        "noun",
        "(hôrs)"));
    animals.decks[0].addCard(new Models.CardModel(
        "гъсеница",
        "Caterpillar",
        "The wormlike larva of a butterfly or moth.",
        "noun",
        "(kătˈər-pĭlˌər, kătˈə-)"));
    animals.decks[0].addCard(new Models.CardModel(
        "котка",
        "Cat",
        "A small carnivorous mammal (Felis catus or F. domesticus) domesticated since early times as a catcher of rats and mice and as a pet and existing in several distinctive breeds and varieties.",
        "noun",
        "(kăt)"));
    animals.decks[0].addCard(new Models.CardModel(
        "тигър",
        "Tiger",
        "A large carnivorous feline mammal (Panthera tigris) of Asia, having a tawny coat with transverse black stripes.",
        "noun",
        "(tīˈgər)"));
    animals.decks[0].addCard(new Models.CardModel(
        "койот",
        "Coyote",
        "A small wolflike carnivorous animal (Canis latrans) native to western North America and found in many other regions of the continent. Also called prairie wolf.",
        "noun",
        "(kī-ōˈtē, kīˈōtˌ)"));
    animals.decks[0].addCard(new Models.CardModel(
        "крокодил",
        "Crocodile",
        "Any of various large aquatic reptiles, chiefly of the genus Crocodylus, native to tropical and subtropical regions and having thick, armorlike skin and long tapering jaws.",
        "noun",
        "(krŏkˈə-dīl)"));
    animals.decks[0].addCard(new Models.CardModel(
        "гарвън",
        "Crow",
        "Any of several large glossy black birds of the genus Corvus, having a characteristic raucous call, especially C. brachyrhynchos of North America.",
        "noun",
        "(krō)"));
    animals.decks[0].addCard(new Models.CardModel(
        "делфин",
        "Dolphin",
        "Any of various marine cetacean mammals, such as the bottle-nosed dolphin, of the family Delphinidae, related to the whales but generally smaller and having a beaklike snout.",
        "noun",
        "(dŏlˈfĭn, dôlˈ-)"));
    animals.decks[0].addCard(new Models.CardModel(
        "патка",
        "Duck",
        "Any of various wild or domesticated swimming birds of the family Anatidae, characteristically having a broad, flat bill, short legs, and webbed feet.",
        "noun",
        "(dŭk)"));
    animals.decks[0].addCard(new Models.CardModel(
        "орел",
        "Eagle",
        "Any of various large diurnal birds of prey of the family Accipitridae, including members of the genera Aquila and Haliaeetus, characterized by a powerful hooked bill, keen vision, long broad wings, and strong soaring flight.",
        "noun",
        "(ēˈgəl)"));
    animals.decks[0].addCard(new Models.CardModel(
        "пор",
        "Ferret",
        "A weasellike, usually albino mammal (Mustela putorius furo) related to the polecat and often trained to hunt rats or rabbits.",
        "noun",
        "(fĕrˈĭt)"));
    animals.decks[0].addCard(new Models.CardModel(
        "комар",
        "Gnat",
        "Any of various small, biting, two-winged flies, such as a punkie or black fly.",
        "noun",
        "(năt)"));
    animals.decks[0].addCard(new Models.CardModel(
        "див заек",
        "Hare",
        "Any of various mammals of the family Leporidae, especially of the genus Lepus, similar to rabbits but having longer ears and legs and giving birth to active, furred young.",
        "noun",
        "(hâr)"));
    animals.decks[0].addCard(new Models.CardModel(
        "хипопотам",
        "Hippopotamus",
        "A large, chiefly aquatic African herbivorous mammal (Hippopotamus amphibius) having thick, dark, almost hairless skin, short legs with four toes, and a broad, wide-mouthed muzzle. Also called river horse.",
        "noun",
        "(hĭpˌə-pŏtˈə-məs)"));
    animals.decks[0].addCard(new Models.CardModel(
        "медуза",
        "Jellyfish",
        "Any of numerous usually free-swimming marine coelenterates of the class Scyphozoa, characteristically having a gelatinous, tentacled, often bell-shaped medusoid stage as the dominant phase of its life cycle.",
        "noun",
        "(jĕlˈē-fĭshˌ)"));
    animals.decks[0].addCard(new Models.CardModel(
        "омар",
        "Lobster",
        "Any of several edible marine crustaceans of the family Homaridae, especially of the genus Homarus, having stalked eyes, long antennae, and five pairs of legs, the first pair of which is modified into large pincers.",
        "noun",
        "(lŏbˈstər)"));
    animals.decks[0].addCard(new Models.CardModel(
        "скакалец",
        "Locust",
        "Any of numerous grasshoppers of the family Acrididae, often migrating in immense swarms that devour vegetation and crops.",
        "noun",
        "(lōˈkəst)"));
    animals.decks[0].addCard(new Models.CardModel(
        "къртица",
        "Mole",
        "A small congenital growth on the human skin, usually slightly raised and dark and sometimes hairy, especially a pigmented nevus.",
        "noun",
        "(mōl)"));
    var getAnimals = function () {
        return animals;
    };

    var atHome = new Models.SetModel("В къщи", "/images/atHome.jpg");
    atHome.deckNumber = 5;
    atHome.decks[0].addCard(new Models.CardModel(
        "кухня",
        "kitchen"));
    atHome.decks[0].addCard(new Models.CardModel(
        "спалня",
        "bedroom"));
    atHome.decks[0].addCard(new Models.CardModel(
        "баня",
        "bathroom"));
    atHome.decks[0].addCard(new Models.CardModel(
        "таванско помещение",
        "attic"));
    atHome.decks[0].addCard(new Models.CardModel(
        "мазе",
        "basement"));
    atHome.decks[0].addCard(new Models.CardModel(
        "покрив",
        "roof"));
    atHome.decks[0].addCard(new Models.CardModel(
        "всекидневна",
        "living room"));
    atHome.decks[0].addCard(new Models.CardModel(
        "бална зала",
        "ball room"));
    atHome.decks[0].addCard(new Models.CardModel(
        "зимна градина",
        "winter garden"));
    atHome.decks[0].addCard(new Models.CardModel(
        "бомбоубежище",
        "bomb shelter"));

    var getAtHome = function () {
        return atHome;
    };

    var atSchool = new Models.SetModel("В училище", "/images/atSchool.jpg");
    atSchool.deckNumber = 5;
    atSchool.decks[0].addCard(new Models.CardModel(
        "учител",
        "teacher"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "директор",
        "principal"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "черна дъска",
        "blackboard"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "молив",
        "pencil"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "калкулатор",
        "calculator"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "ножици",
        "scissors"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "глобус",
        "globe"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "гума",
        "eraser"));
    atSchool.decks[0].addCard(new Models.CardModel(
        "линия",
        "ruler"));

    var getAtSchool = function () {
        return atSchool;
    };

    WinJS.Utilities.markSupportedForProcessing(getAnimals);
    WinJS.Utilities.markSupportedForProcessing(getAtHome);
    WinJS.Utilities.markSupportedForProcessing(getAtSchool);

    WinJS.Namespace.define("Data", {
        Animals: getAnimals,
        AtHome: getAtHome,
        AtSchool:getAtSchool
    });
})()