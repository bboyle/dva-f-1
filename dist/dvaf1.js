/*! dva-f-1 - v1.0.0 - 2016-05-09
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
    var data = window.dvaf1Data = {
        selected: {}
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
        }
    };
    $.each(partials, function(key, partial) {
        var template = $("#" + key + "-partial").remove();
        return template.length ? (partial.template = Handlebars.compile(template.html()), 
        Handlebars.registerPartial(partial.name, partial.template), partial) : void delete partials[key];
    }), // relevance
    formView.on("click change", function(event) {
        var question = $(event.target), name = event.target.name, value = $(event.target).val();
        if (// store data
        data[name] = parseValue(value), value.length && (value = value.replace(/\s+/g, "")), 
        question.is("select,:radio,:checkbox")) // handle data changes
        switch (// store boolean helpers
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
        }
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
        return dvaf1Data.respondentNameGiven ? dvaf1Data.aggrievedNameGiven + (define === !0 ? " (the aggrieved)" : "") : "The aggrieved";
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
    function genderPronoun(gender, feminine, masculine, generic) {
        return dvaf1Data.FEMININE_GENDER.test(gender) ? feminine : dvaf1Data.MASCULINE_GENDER.test(gender) ? masculine : generic;
    }
    function aggrievedILive() {
        if (dvaf1Data.userIsAggrieved) return "I live";
        var she = genderPronoun(dvaf1Data.aggrievedGender, "she", "he", "they");
        return "they" === she ? "they live" : she + " lives";
    }
    function aggrievedYouLive() {
        if (dvaf1Data.userIsAggrieved) return "you live";
        var she = genderPronoun(dvaf1Data.aggrievedGender, "she", "he", "they");
        return "they" === she ? "they live" : she + " lives";
    }
    function TheAggrievedINeed() {
        return dvaf1Data.userIsAggrieved ? "I need" : dvaf1Data.userRelationship && "someone" !== dvaf1Data.userRelationship ? "My " + dvaf1Data.userRelationship + " needs" : "The aggrieved needs";
    }
    function aggrievedYouNeed() {
        if (dvaf1Data.userIsAggrieved) return "you need";
        var she = genderPronoun(dvaf1Data.aggrievedGender, "she", "he", "they");
        return "they" === she ? "they need" : she + " needs";
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
    function aggrievedYou() {
        return dvaf1Data.userIsAggrieved === !1 ? aggrievedName() : "you";
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
    Handlebars.registerHelper("theAggrieved", theAggrieved), Handlebars.registerHelper("TheAggrieved", TheAggrieved), 
    Handlebars.registerHelper("aggrievedName", aggrievedName), Handlebars.registerHelper("AggrievedName", AggrievedName), 
    Handlebars.registerHelper("theAggrieveds", theAggrieveds), Handlebars.registerHelper("TheAggrieveds", TheAggrieveds), 
    Handlebars.registerHelper("aggrievedYou", aggrievedYou), Handlebars.registerHelper("aggrievedYouAre", aggrievedYouAre), 
    Handlebars.registerHelper("aggrievedYour", aggrievedYour), Handlebars.registerHelper("we", we), 
    Handlebars.registerHelper("We", We), Handlebars.registerHelper("theRespondent", theRespondent), 
    Handlebars.registerHelper("RespondentName", RespondentName), Handlebars.registerHelper("respondentName", respondentName), 
    Handlebars.registerHelper("doesTheAggrieved", doesTheAggrieved), Handlebars.registerHelper("DoesTheAggrieved", DoesTheAggrieved), 
    Handlebars.registerHelper("aggrievedILive", aggrievedILive), Handlebars.registerHelper("aggrievedYouLive", aggrievedYouLive), 
    Handlebars.registerHelper("aggrievedYouNeed", aggrievedYouNeed), Handlebars.registerHelper("TheAggrievedINeed", TheAggrievedINeed), 
    Handlebars.registerHelper("TheAggrievedWants", TheAggrievedWants), Handlebars.registerHelper("theAggrievedWants", theAggrievedWants), 
    Handlebars.registerHelper("aggrievedMe", aggrievedMe), Handlebars.registerHelper("aggrievedMy", aggrievedMy), 
    Handlebars.registerHelper("theAggrievedThey", theAggrievedThey), Handlebars.registerHelper("TheAggrievedIs", function() {
        return dvaf1Data.userIsAggrieved ? "You are" : dvaf1Data.userRelationship ? "someone" === dvaf1Data.userRelationship ? "They are" : "Your " + dvaf1Data.userRelationship + " is" : "The aggrieved is";
    }), Handlebars.registerHelper("aggrievedTheir", function() {
        return dvaf1Data.userIsAggrieved ? "your" : genderPronoun(dvaf1Data.aggrievedGender, "her", "his", "their");
    }), Handlebars.registerHelper("aggrievedThey", function() {
        return dvaf1Data.userIsAggrieved ? "your" : genderPronoun(dvaf1Data.aggrievedGender, "she", "he", "they");
    }), Handlebars.registerHelper("aggrievedThem", function() {
        return dvaf1Data.userIsAggrieved ? "your" : genderPronoun(dvaf1Data.aggrievedGender, "her", "him", "them");
    }), Handlebars.registerHelper("respondentThey", function() {
        return genderPronoun(dvaf1Data.respondentGender, "she", "he", "they");
    }), Handlebars.registerHelper("respondentThem", function() {
        return genderPronoun(dvaf1Data.respondentGender, "her", "him", "them");
    }), Handlebars.registerHelper("respondentTheyKnow", function() {
        return "they know";
    }), Handlebars.registerHelper("plus1", function(n) {
        return parseFloat(n) + 1;
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
    function showPage(index) {
        var view = views[viewSequence[index]];
        page = index, formView.html($(view.template(dvaf1Data))), view.relevance && $.each(view.relevance, function(target, condition) {
            $.isArray(condition) ? $.each(condition, function(i, condition) {
                formView.find(target).relevance("relevantWhen", processCondition(formView, condition));
            }) : formView.find(target).relevance("relevantWhen", processCondition(formView, condition));
        }), $("html, body").scrollTop(scrollReset.top).scrollLeft(scrollReset.left), refresh();
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
        "dvaf1-conditions-template": {},
        "dvaf1-urgent-template": {},
        "dvaf1-aggrieved-template": {},
        "dvaf1-children-template": {},
        "dvaf1-associates-template": {},
        "dvaf1-respondent-template": {},
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
        "dvaf1-applicant-template": {},
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