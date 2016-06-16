/*! dva-f-1 - v1.0.0 - 2016-06-16
* https://github.com/bboyle/dva-f-1#readme
* Copyright (c) 2016 Queensland Government; Licensed BSD-3-Clause */
/* global Handlebars */
$(function($) {
    "use strict";
    function parseValue(value) {
        return /^Yes|No$/.test(value) ? "Yes" === value : value;
    }
    function refreshPartial(partial) {
        $("#" + partial).html(partials[partial].template(data));
    }
    function parseGender(key, value) {
        data[key] = data.FEMININE_GENDER.test(value) ? "Woman" : data.MASCULINE_GENDER.test(value) ? "Man" : data[key];
    }
    function findServicesNearGeo(geo) {
        var distance = "(3959*acos(cos(radians(" + geo.y + '))*cos(radians("Latitude"))*cos(radians("Longitude")-radians(' + geo.x + "))+sin(radians(" + geo.y + '))*sin(radians("Latitude"))))', select = [ "*" ];
        select.push(distance + ' AS "Distance"'), $.each(DATASET, function(key, dataset) {
            $.ajax("https://data.qld.gov.au/api/action/datastore_search_sql", {
                data: {
                    sql: "SELECT " + select.join(",") + ' FROM "' + dataset.resource + '" WHERE ' + dataset.where + ' ORDER BY "Distance" LIMIT 3'
                },
                dataType: "json",
                cache: !0
            }).then(function(response) {
                data.nearby[key] = response.result.records.length ? response.result.records : [];
            });
        });
    }
    function findServicesNearAddress(address) {
        // get geocode for address
        $.ajax("//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates", {
            data: {
                f: "json",
                countryCode: "AU",
                singleLine: address
            },
            dataType: "json",
            cache: !0
        }).then(function(response) {
            response.candidates.length && findServicesNearGeo(response.candidates[0].location);
        });
    }
    function renumberControls(section, n) {
        var heading = $(".label", section).eq(0);
        heading.text(heading.text().replace(/\d+/, n + 1)), $("input, select, textarea", section).each(function(j, control) {
            control.id = control.id.replace(/\d+/, n), control.name = control.name.replace(/\d+/, n);
        }), $("label", section).each(function(j, label) {
            label.htmlFor = label.htmlFor.replace(/\d+/, n);
        }), $("button.add, button.del", section).each(function(j, button) {
            button = $(button), button.val(n).html(button.html().replace(/\d+/, n + 1));
        });
    }
    var data = window.dvaf1Data = {
        selected: {},
        event: [ {} ],
        child: [ {} ],
        associate: [ {} ],
        nearby: {}
    };
    data.MASCULINE_GENDER = /(^(man|male|he|him|his)$)|father|son|brother|nephew|uncle|husband|boy/i, 
    data.FEMININE_GENDER = /(^(her|she)$)|woman|female|mother|daughter|sister|neice|aunt|wife|girl/i;
    var formView = $("#dvaf1-form-view"), partials = {
        "dvaf1-dfn-aggrieved": {
            name: "dfnAggrieved"
        },
        "dvaf1-info-aggrieved-danger": {
            name: "infoAggrievedDanger"
        },
        "dvaf1-info-aggrieved-privacy": {
            name: "infoAggrievedPrivacy"
        },
        "dvaf1-situation-relationship": {
            name: "situationRelationshipQuestion"
        },
        "dvaf1-aggrieved-existing-order": {
            name: "aggrievedExistingOrderQuestion"
        },
        "dvaf1-aggrieved-existing-order-advice": {
            name: "infoExistingOrder"
        },
        "dvaf1-grounds-event": {
            name: "repeatGroundsEvent"
        }
    }, DATASET = {
        court: {
            resource: "400eeff4-d3d4-4d5a-9e99-7f993e768daf",
            where: "\"Title\" LIKE '%Magistrates%'"
        },
        jp: {
            resource: "ca0f717e-b038-4596-96c4-b006b60314a8",
            where: "1=1"
        },
        victimService: {
            resource: "96d6b499-e402-409c-9c91-e8c02f2801c8",
            where: "\"Support services\" LIKE '%domestic violence%'"
        }
    };
    $.each(partials, function(key, partial) {
        var template = $("#" + key + "-partial").remove();
        return template.length ? (partial.template = Handlebars.compile(template.html()), 
        Handlebars.registerPartial(partial.name, partial.template), partial) : void delete partials[key];
    }), // relevance
    formView.on("click change", function(event) {
        var index, question = $(event.target), name = event.target.name, value = $(event.target).val();
        if (!question.is("button.add, button.del")) if (// store data
        /^(event|child|associate)[0-9]+\./.test(name) ? (index = name.replace(/^(?:event|child|associate)([0-9]+).*$/, "$1"), 
        name = name.split(/[0-9]+\./), data[name[0]][index] = data[name[0]][index] || {}, 
        data[name[0]][index][name[1]] = value) : (data[name] = parseValue(value), value.length && (value = $.trim(value).replace(/\s\s+/g, " "))), 
        question.is("select,:radio,:checkbox")) // handle data changes
        switch (// store boolean helpers (select controls)
        question.is(":checkbox") ? (data.selected[name] = data.selected[name] || {}, data.selected[name][value] = event.target.checked) : (data.selected[name] = {}, 
        data.selected[name][value] = !0), name) {
          case "situationParty":
            parseGender("respondentGender", value);
            break;

          case "userRelationship":
            parseGender("aggrievedGender", value);

          // fallthrough
            case "userIsAggrieved":
            refreshPartial("dvaf1-dfn-aggrieved"), refreshPartial("dvaf1-situation-relationship"), 
            refreshPartial("dvaf1-aggrieved-existing-order"), refreshPartial("dvaf1-aggrieved-existing-order-advice");
            break;

          case "userDanger":
            refreshPartial("dvaf1-info-aggrieved-danger");
            break;

          case "userPrivacy":
            refreshPartial("dvaf1-info-aggrieved-privacy");
            break;

          case "aggrievedExistingOrderJurisdiction":
            refreshPartial("dvaf1-aggrieved-existing-order-advice");
        } else // handle data changes (not select)
        switch (name) {
          case "aggrievedAddress":
            value.length && findServicesNearAddress(value);
        }
    }), // add repeating section
    $(document).on("click", "button.add", function() {
        var index = parseInt(this.value, 10), repeatData = data[this.name], section = $(this).closest(".section, .group");
        // clean up data
        repeatData.splice(index + 1, 0, {}), 0 === section.find("button.del").length && section.find(".actions").append('<li><em><button type="button" class="del" name="' + this.name + '" value="0"><i class="fa fa-minus-square"></i> Remove ' + this.name + " 1</button></em></li>");
        // insert new section
        var clone = section.clone();
        $("input, select, textarea", clone).each(function(j, control) {
            control.value = "";
        }), clone.insertAfter(section), index++, section.nextAll(".section, .group").each(function(i, section) {
            renumberControls(section, index + i);
        });
    }), // remove repeating section
    $(document).on("click", "button.del", function() {
        var index = parseInt(this.value, 10), repeatData = data[this.name];
        // clean up data
        repeatData.splice(index, 1), repeatData.length < 1 && (repeatData[0] = {}), // clean up UI
        $(this).closest(".section, .group").nextAll(".section, .group").each(function(i, section) {
            repeatData.length < 2 && $("button.del", section).remove(), renumberControls(section, index + i);
        }), $(this).closest(".section, .group").remove();
    });
}), /* global Handlebars, dvaf1Data */
$(function() {
    "use strict";
    function TitleCase(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    function theAggrieved() {
        return dvaf1Data.userIsAggrieved ? "you" : dvaf1Data.userRelationship && "someone" !== dvaf1Data.userRelationship ? "your " + dvaf1Data.userRelationship : "the aggrieved";
    }
    function theRespondent() {
        return "the respondent";
    }
    function TheAggrieved() {
        return TitleCase(theAggrieved());
    }
    function aggrievedName(define) {
        return dvaf1Data.aggrievedNameGiven ? dvaf1Data.aggrievedNameGiven + (define === !0 ? " (the aggrieved)" : "") : "the aggrieved";
    }
    function AggrievedName(define) {
        return dvaf1Data.aggrievedNameGiven ? dvaf1Data.aggrievedNameGiven + (define === !0 ? " (the aggrieved)" : "") : "The aggrieved";
    }
    function respondentName(define) {
        return dvaf1Data.respondentNameGiven ? dvaf1Data.respondentNameGiven + (define === !0 ? " (the respondent)" : "") : "the respondent";
    }
    function RespondentName(define) {
        return dvaf1Data.respondentNameGiven ? dvaf1Data.respondentNameGiven + (define === !0 ? " (the respondent)" : "") : "The respondent";
    }
    function theAggrieveds() {
        return dvaf1Data.userIsAggrieved ? "your" : aggrievedName() + "’s";
    }
    function TheAggrieveds() {
        return TitleCase(theAggrieveds());
    }
    function doesTheAggrieved() {
        return dvaf1Data.userIsAggrieved ? "do you" : dvaf1Data.aggrievedNameGiven ? "does " + dvaf1Data.aggrievedNameGiven : dvaf1Data.userRelationship ? "someone" === dvaf1Data.userRelationship ? "do they" : "does your " + dvaf1Data.userRelationship : "does the aggrieved";
    }
    function DoesTheAggrieved() {
        return TitleCase(doesTheAggrieved());
    }
    function doesTheRespondent() {
        return dvaf1Data.respondentNameGiven ? "does " + dvaf1Data.respondentNameGiven : "does the respondent";
    }
    function DoesTheRespondent() {
        return TitleCase(doesTheRespondent());
    }
    function isTheAggrieved() {
        return dvaf1Data.userIsAggrieved ? "are you" : dvaf1Data.aggrievedNameGiven ? "is " + dvaf1Data.aggrievedNameGiven : dvaf1Data.userRelationship ? "someone" === dvaf1Data.userRelationship ? "are they" : "is your " + dvaf1Data.userRelationship : "is the aggrieved";
    }
    function IsTheAggrieved() {
        return TitleCase(isTheAggrieved());
    }
    function isTheRespondent() {
        return dvaf1Data.respondentNameGiven ? "is " + dvaf1Data.respondentNameGiven : "is the respondent";
    }
    function IsTheRespondent() {
        return TitleCase(isTheRespondent());
    }
    function genderPronoun(gender, feminine, masculine, generic) {
        return dvaf1Data.FEMININE_GENDER.test(gender) ? feminine : dvaf1Data.MASCULINE_GENDER.test(gender) ? masculine : generic;
    }
    function aggrievedILive() {
        if (dvaf1Data.userIsAggrieved) return "I live";
        var she = genderPronoun(dvaf1Data.aggrievedGender, "she", "he", "they");
        return "they" === she ? "they live" : she + " lives";
    }
    function aggrievedYouPlurals(singular, plural) {
        if (dvaf1Data.userIsAggrieved) return "you " + singular;
        var she = genderPronoun(dvaf1Data.aggrievedGender, "she", "he", "they");
        return "they" === she ? "they " + singular : she + " " + plural;
    }
    function aggrievedYouLive() {
        return aggrievedYouPlurals("live", "lives");
    }
    function aggrievedYouKnow() {
        return aggrievedYouPlurals("know", "knows");
    }
    function aggrievedYouHave() {
        return aggrievedYouPlurals("have", "has");
    }
    function TheAggrievedINeed() {
        return dvaf1Data.userIsAggrieved ? "I need" : dvaf1Data.userRelationship && "someone" !== dvaf1Data.userRelationship ? "My " + dvaf1Data.userRelationship + " needs" : "The aggrieved needs";
    }
    function aggrievedYouNeed() {
        return aggrievedYouPlurals("need", "needs");
    }
    function respondentTheyReceive() {
        var she = genderPronoun(dvaf1Data.respondentGender, "she", "he", "they");
        return "they" === she ? "they receive" : she + " receives";
    }
    function theAggrievedWants() {
        return dvaf1Data.userIsAggrieved ? "You want" : dvaf1Data.aggrievedNameGiven ? dvaf1Data.aggrievedNameGiven + " wants" : "The aggrieved wants";
    }
    function TheAggrievedWants() {
        return TitleCase(theAggrievedWants());
    }
    function aggrievedMe() {
        return dvaf1Data.userIsAggrieved ? "me" : genderPronoun(dvaf1Data.aggrievedGender, "her", "him", "them");
    }
    function aggrievedMy() {
        return dvaf1Data.userIsAggrieved ? "my" : genderPronoun(dvaf1Data.aggrievedGender, "her", "his", "their");
    }
    function theAggrievedThey() {
        return dvaf1Data.userIsAggrieved === !1 ? dvaf1Data.aggrievedNameGiven : "you";
    }
    function aggrievedYou(define) {
        return dvaf1Data.userIsAggrieved === !1 ? aggrievedName() + (define === !0 ? " (the aggrieved)" : "") : "you" + (define === !0 ? " (the aggrieved)" : "");
    }
    function aggrievedYouThem() {
        return dvaf1Data.userIsAggrieved === !1 ? genderPronoun(dvaf1Data.aggrievedGender, "her", "him", "them") : "you";
    }
    function aggrievedYouAre() {
        return dvaf1Data.userIsAggrieved === !1 ? aggrievedName() + " is" : "you are";
    }
    function aggrievedYour() {
        return dvaf1Data.userIsAggrieved === !1 ? genderPronoun(dvaf1Data.aggrievedGender, "her", "his", aggrievedName()) : "your";
    }
    function we() {
        return dvaf1Data.userIsAggrieved === !1 ? aggrievedName() + " and " + respondentName() : "we";
    }
    function We() {
        return TitleCase(we());
    }
    function respondentThey() {
        return genderPronoun(dvaf1Data.respondentGender, "she", "he", "they");
    }
    function RespondentThey() {
        return TitleCase(respondentThey());
    }
    Handlebars.registerHelper("theAggrieved", theAggrieved), Handlebars.registerHelper("TheAggrieved", TheAggrieved), 
    Handlebars.registerHelper("aggrievedName", aggrievedName), Handlebars.registerHelper("AggrievedName", AggrievedName), 
    Handlebars.registerHelper("theAggrieveds", theAggrieveds), Handlebars.registerHelper("TheAggrieveds", TheAggrieveds), 
    Handlebars.registerHelper("aggrievedYou", aggrievedYou), Handlebars.registerHelper("aggrievedYouThem", aggrievedYouThem), 
    Handlebars.registerHelper("aggrievedYouAre", aggrievedYouAre), Handlebars.registerHelper("aggrievedYour", aggrievedYour), 
    Handlebars.registerHelper("we", we), Handlebars.registerHelper("We", We), Handlebars.registerHelper("theRespondent", theRespondent), 
    Handlebars.registerHelper("RespondentName", RespondentName), Handlebars.registerHelper("respondentName", respondentName), 
    Handlebars.registerHelper("respondentTheyReceive", respondentTheyReceive), Handlebars.registerHelper("doesTheRespondent", doesTheRespondent), 
    Handlebars.registerHelper("DoesTheRespondent", DoesTheRespondent), Handlebars.registerHelper("IsTheRespondent", IsTheRespondent), 
    Handlebars.registerHelper("doesTheAggrieved", doesTheAggrieved), Handlebars.registerHelper("DoesTheAggrieved", DoesTheAggrieved), 
    Handlebars.registerHelper("isTheAggrieved", isTheAggrieved), Handlebars.registerHelper("IsTheAggrieved", IsTheAggrieved), 
    Handlebars.registerHelper("aggrievedILive", aggrievedILive), Handlebars.registerHelper("aggrievedYouHave", aggrievedYouHave), 
    Handlebars.registerHelper("aggrievedYouLive", aggrievedYouLive), Handlebars.registerHelper("aggrievedYouKnow", aggrievedYouKnow), 
    Handlebars.registerHelper("aggrievedYouPlurals", aggrievedYouPlurals), Handlebars.registerHelper("aggrievedYouNeed", aggrievedYouNeed), 
    Handlebars.registerHelper("TheAggrievedINeed", TheAggrievedINeed), Handlebars.registerHelper("TheAggrievedWants", TheAggrievedWants), 
    Handlebars.registerHelper("theAggrievedWants", theAggrievedWants), Handlebars.registerHelper("aggrievedMe", aggrievedMe), 
    Handlebars.registerHelper("aggrievedMy", aggrievedMy), Handlebars.registerHelper("theAggrievedThey", theAggrievedThey), 
    Handlebars.registerHelper("TheAggrievedIs", function() {
        return dvaf1Data.userIsAggrieved ? "You are" : dvaf1Data.userRelationship ? "someone" === dvaf1Data.userRelationship ? "They are" : "Your " + dvaf1Data.userRelationship + " is" : "The aggrieved is";
    }), Handlebars.registerHelper("TheApplicantIs", function() {
        return "user" === dvaf1Data.applicationLodgedBy ? "I am" : "The applicant is";
    }), Handlebars.registerHelper("aggrievedTheir", function() {
        return dvaf1Data.userIsAggrieved ? "your" : genderPronoun(dvaf1Data.aggrievedGender, "her", "his", "their");
    }), Handlebars.registerHelper("aggrievedThey", function() {
        return dvaf1Data.userIsAggrieved ? "your" : genderPronoun(dvaf1Data.aggrievedGender, "she", "he", "they");
    }), Handlebars.registerHelper("aggrievedThem", function() {
        return dvaf1Data.userIsAggrieved ? "your" : genderPronoun(dvaf1Data.aggrievedGender, "her", "him", "them");
    }), Handlebars.registerHelper("respondentTheir", function() {
        return genderPronoun(dvaf1Data.respondentGender, "her", "his", "their");
    }), Handlebars.registerHelper("respondentThey", respondentThey), Handlebars.registerHelper("RespondentThey", RespondentThey), 
    Handlebars.registerHelper("respondentThem", function() {
        return genderPronoun(dvaf1Data.respondentGender, "her", "him", "them");
    }), Handlebars.registerHelper("respondentTheyKnow", function() {
        return "they know";
    }), Handlebars.registerHelper("plus1", function(n) {
        return parseFloat(n) + 1;
    }), Handlebars.registerHelper("theChildren", function() {
        return "the " + (1 === dvaf1Data.child.length ? "child" : "children");
    }), Handlebars.registerHelper("theAggrievedsKids", function() {
        return theAggrieveds() + " " + dvaf1Data.child.length === 1 ? "kid" : "kids";
    }), Handlebars.registerHelper("theAssociatesNeed", function() {
        return "the " + dvaf1Data.associate.length === 1 ? "associate needs" : "associates need";
    });
}), /* global Handlebars, dvaf1Data */
$(function($) {
    "use strict";
    function processCondition(view, condition) {
        return "*" === condition.values && (condition.values = $.map($(view.find("form").get(0).elements[condition.name]).find("option"), function(option) {
            return option.value ? option.value : null;
        })), condition;
    }
    function refresh() {
        formView.trigger("x-height-change");
    }
    function updateNavigation(pageId) {
        var links = $("a").filter('[href $= "' + pageId + '"]');
        $(".current-page, .current").not(links.parents(".current-page, .current")).removeClass("current", "current-page"), 
        links.closest(".has-submenu").addClass("current-page"), links.closest("li").addClass("current");
    }
    function showPage(index) {
        var pageId = viewSequence[index], view = views[pageId];
        page = index, formView.html($(view.template(dvaf1Data))), view.relevance && $.each(view.relevance, function(target, condition) {
            $.isArray(condition) ? $.each(condition, function(i, condition) {
                formView.find(target).relevance("relevantWhen", processCondition(formView, condition));
            }) : formView.find(target).relevance("relevantWhen", processCondition(formView, condition));
        }), updateNavigation(pageId), $("html, body").scrollTop(scrollReset.top).scrollLeft(scrollReset.left), 
        refresh();
    }
    var formView = $("#dvaf1-form-view"), scrollReset = formView.offset(), views = {
        "dvaf1-preamble-template": {
            relevance: {
                "#dvaf1-legal-advice": {
                    name: "legalAdvice",
                    value: "How"
                }
            }
        },
        "dvaf1-situation-template": {
            relevance: {
                "#dvaf1-dfn-aggrieved": [ {
                    name: "userIsAggrieved",
                    value: "Yes"
                }, {
                    name: "userRelationship",
                    values: "*"
                } ],
                "#dvaf1-user-relationship-placeholder": {
                    name: "userIsAggrieved",
                    value: "No",
                    negate: !0
                },
                "#dvaf1-user-relationship": {
                    name: "userIsAggrieved",
                    value: "No"
                },
                "#dvaf1-aggrieved-danger-question": {
                    name: "userIsAggrieved",
                    value: "Yes"
                },
                "#dvaf1-aggrieved-privacy-question": {
                    name: "userDanger",
                    values: [ "Yes", "Maybe", "No" ]
                },
                "#dvaf1-info-aggrieved-danger": {
                    name: "userDanger",
                    values: [ "Yes", "Maybe" ]
                },
                "#dvaf1-info-aggrieved-privacy": {
                    name: "userPrivacy",
                    values: [ "No", "Not sure" ]
                },
                "#dvaf1-situation-relationship": [ {
                    name: "userPrivacy",
                    value: "Yes"
                }, {
                    name: "userRelationship",
                    values: "*"
                } ],
                "#dvaf1-aggrieved-existing-order-jurisdiction": {
                    name: "aggrievedExistingOrder",
                    value: "Yes"
                },
                "#dvaf1-aggrieved-existing-order-advice": {
                    name: "aggrievedExistingOrderJurisdiction",
                    values: [ "ACT", "NSW", "NT", "QLD", "SA", "Tas", "Vic", "WA", "NZ", "Other" ]
                }
            }
        },
        "dvaf1-aggrieved-basic-template": {},
        "dvaf1-respondent-basic-template": {},
        "dvaf1-relationship-template": {
            relevance: {
                "#dvaf1-relationship-commercialcare": {
                    name: "aggrievedRelationship",
                    value: "CommercialCare"
                },
                "#dvaf1-relationship-intimate": {
                    name: "aggrievedRelationship",
                    value: "Intimate"
                },
                "#dvaf1-relationship-intimate-couple": {
                    name: "aggrievedRelationshipType",
                    values: [ "Couple", "FormerCouple" ]
                },
                "#dvaf1-relationship-family": {
                    name: "aggrievedRelationship",
                    value: "Family"
                },
                "#dvaf1-relationship-informalcare": {
                    name: "aggrievedRelationship",
                    value: "InformalCare"
                }
            }
        },
        "dvaf1-grounds-template": {
            relevance: {
                "#dvaf1-weapon-other-question": {
                    name: "respondentWeaponThreat",
                    value: "No"
                },
                "#dvaf1-weapon-details": {
                    name: "respondentWeaponThreat",
                    value: "Yes"
                },
                "#dvaf1-weapon-details2": {
                    name: "respondentWeaponThreat2",
                    value: "Yes"
                }
            }
        },
        "dvaf1-conditions-template": {
            relevance: {
                "#dvaf1-children-grounds": {
                    name: "conditionsNameChildren",
                    value: "Yes"
                },
                "#dvaf1-applicant-suffered": {
                    name: "associatesSuffered",
                    value: "No"
                },
                "#dvaf1-associate-protection": [ {
                    name: "associatesSuffered",
                    value: "Yes"
                }, {
                    name: "applicantSuffered",
                    value: "Yes"
                } ],
                "#dvaf1-associate-protection-grounds": {
                    name: "conditionsNameAssociates",
                    value: "Yes"
                },
                "#dvaf1-conditions-distance-aggrieved-grounds": {
                    name: "conditionsDistanceAggrieved",
                    value: "Yes"
                },
                "#dvaf1-conditions-distance-aggrieved-list": {
                    name: "conditionsDistanceAggrievedPlaces",
                    value: "Yes"
                },
                "#dvaf1-conditions-distance-aggrieved-other": {
                    name: "conditionsDistanceAggrievedOther",
                    value: "Yes"
                },
                "#dvaf1-conditions-distance-aggrieved-places-grounds": [ {
                    name: "conditionsDistanceAggrievedHome",
                    value: "Yes"
                }, {
                    name: "conditionsDistanceAggrievedWork",
                    value: "Yes"
                }, {
                    name: "conditionsDistanceAggrievedStaying",
                    value: "Yes"
                }, {
                    name: "conditionsDistanceAggrievedOther",
                    value: "Yes"
                } ],
                ".dvaf1-conditions-ouster-data": {
                    name: "conditionOuster",
                    value: "Yes"
                },
                "#dvaf1-conditions-children": {
                    name: "conditionsNameChildren",
                    value: "Yes"
                },
                "#dvaf1-children-distance-grounds": {
                    name: "conditionsDistanceChildrenRequested",
                    value: "Yes"
                },
                "#dvaf1-conditions-associates": {
                    name: "conditionsNameAssociates",
                    value: "Yes"
                },
                "#dvaf1-conditions-associates-grounds": {
                    name: "conditionsDistanceAssociatesRequested",
                    value: "Yes"
                },
                "#dvaf1-conditions-distance-associates-home-grounds": {
                    name: "conditionProhibitEntryAssociates",
                    value: "Yes"
                },
                "#dvaf1-conditions-respondent-contact-aggrieved": {
                    name: "conditionsRespondentHasContactedAggrieved",
                    value: "Yes"
                },
                "#dvaf1-conditions-contact-associates": {
                    name: "conditionProhibitContact",
                    value: "Yes"
                },
                "#dvaf1-conditions-contact-associates-stop": {
                    name: "respondentHasContactedAssociates",
                    value: "Yes"
                },
                "#dvaf1-conditions-stop-contact-grounds": [ {
                    name: "conditionProhibitContact",
                    value: "Yes"
                }, {
                    name: "conditionProhibitContactAssociates",
                    value: "Yes"
                } ],
                "#dvaf1-conditions-social-media-grounds": {
                    name: "conditionsProhibtSocialMedia",
                    value: "Yes"
                },
                "#dvaf1-conditions-aggrieved-locate-grounds": {
                    name: "conditionProhibitLocating",
                    value: "Yes"
                },
                "#dvaf1-conditions-property-grounds": {
                    name: "conditionsRecoverProperty",
                    value: "Yes"
                },
                "#dvaf1-conditions-behaviour-grounds": {
                    name: "conditionProhibitConduct",
                    value: "Yes"
                }
            }
        },
        "dvaf1-urgent-template": {
            relevance: {
                "#dvaf1-tpo-info": [ {
                    name: "abuseRecent",
                    value: "No"
                }, {
                    name: "abuseImmediateFear",
                    value: "No"
                }, {
                    name: "abuseApplicationRetaliation",
                    value: "No"
                } ],
                "#dvaf1-tpo-grounds": {
                    name: "tpoApply",
                    value: "Yes"
                }
            }
        },
        "dvaf1-aggrieved-template": {
            relevance: {
                "#dvaf1-aggrieved-interpreter-language": {
                    name: "aggrievedRequiresInterpreter",
                    value: "Yes"
                },
                "#dvaf1-aggrieved-disability-description": {
                    name: "aggrievedHasDisability",
                    value: "Yes"
                },
                "#dvaf1-aggrieved-parent-details": {
                    name: "aggrievedUnder18",
                    value: "Yes"
                }
            }
        },
        "dvaf1-children-template": {
            relevance: {
                ".dvaf1-children": {
                    name: "conditionsNameChildren",
                    value: "Yes"
                }
            }
        },
        "dvaf1-associates-template": {},
        "dvaf1-respondent-template": {
            relevance: {
                "#dvaf1-respondent-interpreter-language": {
                    name: "respondentRequiresInterpreter",
                    value: "Yes"
                },
                "#dvaf1-respondent-disability-description": {
                    name: "respondentHasDisability",
                    value: "Yes"
                },
                "#dvaf1-respondent-parent-details": {
                    name: "respondentUnder18",
                    value: "Yes"
                },
                "#dvaf1-respondent-weapon-access-description": {
                    name: "respondentWeaponsAccess",
                    values: [ "Yes", "Unsure" ]
                },
                "#dvaf1-weapon-licence-info": {
                    name: "respondentWeaponsLicence",
                    value: "Yes"
                },
                "#dvaf1-weapon-licence-details": {
                    name: "respondentWeaponsLicence",
                    value: "Yes"
                }
            }
        },
        "dvaf1-orders-template": {
            relevance: {
                "#dvfa1-orders-existing": {
                    name: "ordersExist",
                    value: "Yes"
                },
                "#dvfa1-orders-existing-other": {
                    name: "ordersOther",
                    values: [ "Current", "Past" ]
                },
                "#dvaf1-orders-cross-application-status": {
                    name: "ordersCrossApplicationInProgress",
                    value: "Yes"
                }
            }
        },
        "dvaf1-applicant-template": {
            relevance: {
                "#dvaf1-applicant-type": {
                    name: "applicationLodgedBy",
                    values: [ "user", "thirdParty" ]
                },
                "#dvaf1-applicant-type-details": {
                    name: "applicationLodgedBy",
                    values: [ "user", "thirdParty" ]
                },
                "#dvaf1-application-partA": {
                    name: "applicantPart",
                    value: "A"
                },
                "#dvaf1-application-partB": {
                    name: "applicantPart",
                    value: "B"
                },
                "#dvaf1-application-partD": {
                    name: "applicantPart",
                    value: "D"
                },
                "#dvaf1-application-authorisation-received": {
                    name: "applicantAuthorisedInWriting",
                    value: "No"
                },
                "#dvaf1-application-partB-other": {
                    name: "applicantActingAs",
                    value: "Other"
                }
            }
        },
        "dvaf1-court-template": {
            relevance: {
                "#dvaf1-court-safety-info": {
                    name: "aggrievedCourtSafetyConcern",
                    value: "Yes"
                },
                "#dvaf1-court-safety-attending": {
                    name: "aggrievedCourtSafetyConcern",
                    value: "Yes"
                },
                "#dvaf1-court-safety-leaving": {
                    name: "aggrievedCourtSafetyConcern",
                    value: "Yes"
                }
            }
        },
        "dvaf1-download-template": {}
    }, viewSequence = [], page = 0;
    $.each(views, function(key, view) {
        var template = $("#" + key).remove();
        return template.length ? (view.template = Handlebars.compile(template.html()), viewSequence.push(key), 
        view) : void delete views[key];
    }), formView.on("relevant irrelevant", refresh), // handle form view navigation
    formView.on("submit", function(event) {
        "POST" !== event.target.method.toUpperCase() && (event.preventDefault(), viewSequence[page + 1] ? showPage(page + 1) : event.target.action && window.location.replace(event.target.action));
    }), // navigation by menu links
    $(document).on("click", "a", function(event) {
        var target = event.target.href.split("#");
        target.length > 1 && /^dvaf1/.test(target[1]) && (target = viewSequence.indexOf(target[1]), 
        -1 !== target && (event.preventDefault(), showPage(target)));
    }), // init
    showPage(page);
});