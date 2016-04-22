/*! dva-f-1 - v1.0.0 - 2016-04-22
* https://github.com/bboyle/dva-f-1#readme
* Copyright (c) 2016 Queensland Government; Licensed BSD-3-Clause */
$(function($) {
    "use strict";
    function parseValue(value) {
        return /^true|false$/.test(value) ? "true" === value : value;
    }
    var data = window.dvaf1Data = {
        selected: {}
    }, formView = $("#dvaf1-form-view");
    // store state
    formView.on("change", function(event) {
        var question = $(event.target), name = event.target.name, value = parseValue($(event.target).val());
        data[name] = value, question.is("select,:radio,:checkbox") && (question.is(":checkbox") ? data.selected[name][value] = event.target.checked : (data.selected[name] = {}, 
        data.selected[name][value] = !0));
    });
}), /* global Handlebars, dvaf1Data */
$(function() {
    "use strict";
    Handlebars.registerHelper("doesTheAggrieved", function() {
        return dvaf1Data.userIsAggrieved ? "do you" : dvaf1Data.userRelationship ? "someone" === dvaf1Data.userRelationship ? "do they" : "does your " + dvaf1Data.userRelationship : "does the aggrieved";
    }), Handlebars.registerHelper("TheAggrievedIs", function() {
        return dvaf1Data.userIsAggrieved ? "You are" : dvaf1Data.userRelationship ? "someone" === dvaf1Data.userRelationship ? "They are" : "Your " + dvaf1Data.userRelationship + " is" : "The aggrieved is";
    });
}), /* global Handlebars, dvaf1Data */
$(function($) {
    "use strict";
    function processCondition(view, condition) {
        return "*" === condition.values && (condition.values = $.map($(view.find("form").get(0).elements[condition.name]).find("option"), function(option) {
            return option.value ? option.value : null;
        })), condition;
    }
    function showPage(index) {
        var view = views[viewSequence[index]];
        formView.html($(view.template(dvaf1Data))), $.each(view.relevance, function(target, condition) {
            $.isArray(condition) ? $.each(condition, function(i, condition) {
                formView.find(target).relevance("relevantWhen", processCondition(formView, condition));
            }) : formView.find(target).relevance("relevantWhen", processCondition(formView, condition));
        });
    }
    var formView = $("#dvaf1-form-view"), partials = {
        dfnAggrieved: {
            id: "dvaf1-dfn-aggrieved-partial"
        }
    }, views = {
        formPreamble: {
            id: "dvaf1-preamble-template",
            relevance: {
                "#dvaf1-legal-advice": {
                    name: "legalAdvice",
                    value: "How do I get legal advice?"
                }
            }
        },
        formSituation: {
            id: "dvaf1-situation-template",
            relevance: {
                "#dvaf1-dfn-aggrieved": [ {
                    name: "userIsAggrieved",
                    value: "true"
                }, {
                    name: "userRelationship",
                    values: "*"
                } ],
                "#dvaf1-user-relationship-placeholder": {
                    name: "userIsAggrieved",
                    value: "false",
                    negate: !0
                },
                "#dvaf1-user-relationship": {
                    name: "userIsAggrieved",
                    value: "false"
                }
            }
        },
        formAggrievedBasic: {
            id: "dvaf1-aggrieved-basic-template"
        },
        formRespondentBasic: {
            id: "dvaf1-respondent-basic-template"
        },
        formRelationship: {
            id: "dvaf1-relationship-template"
        },
        formGrounds: {
            id: "dvaf1-grounds-template"
        },
        formConditions: {
            id: "dvaf1-conditions-template"
        },
        formUrgent: {
            id: "dvaf1-urgent-template"
        },
        formAggrieved: {
            id: "dvaf1-aggrieved-template"
        },
        formChildren: {
            id: "dvaf1-children-template"
        },
        formAssociates: {
            id: "dvaf1-associates-template"
        },
        formRespondent: {
            id: "dvaf1-respondent-template"
        },
        formOrders: {
            id: "dvaf1-orders-template"
        },
        formApplicant: {
            id: "dvaf1-applicant-template"
        },
        formCourt: {
            id: "dvaf1-court-template"
        },
        formDownload: {
            id: "dvaf1-download-template"
        }
    }, viewSequence = [], page = 0;
    $.each(partials, function(key, partial) {
        var template = $("#" + partial.id).remove();
        return template.length ? (partial.template = Handlebars.compile(template.html()), 
        Handlebars.registerPartial(key, partial.template), partial) : void delete partials[key];
    }), $.each(views, function(key, view) {
        var template = $("#" + view.id).remove();
        return template.length ? (view.template = Handlebars.compile(template.html()), viewSequence.push(key), 
        view) : void delete views[key];
    }), // handle form view navigation
    formView.on("submit", function(event) {
        event.preventDefault(), page++, viewSequence[page] ? showPage(page) : event.target.action && window.location.replace(event.target.action);
    }), // relevance
    formView.on("change", function(event) {
        var question = $(event.target), name = event.target.name;
        if (question.is("select,:radio,:checkbox")) // regenerate status blocks
        switch (name) {
          case "userIsAggrieved":
          case "userRelationship":
            $("#dvaf1-dfn-aggrieved").html(partials.dfnAggrieved.template(dvaf1Data));
        }
    }), // init
    showPage(page);
});