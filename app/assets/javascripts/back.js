var Matter = Backbone.Model.extend({ 
  urlRoot: "/lists/1/matters"
});

var MatterCollection = Backbone.Collection.extend({
  model: Matter,
  url: "/lists/1/matters"
});

var MatterView = Backbone.View.extend({
  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  events: {
    "change input[type='checkbox']": "toggleDone",
    "click span": "destroy"
  },

  toggleDone: function(e) {
    var checked = $(e.target).is(":checked");
    this.model.set('done', checked);
    this.model.save();
  },

  destroy: function() {
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var template = $("script.template").html();
    var rendered = _.template(template, { matter: this.model });
    this.$el.html(rendered);
  }
});

var FormView = Backbone.View.extend({
  el: "form",

  events: {
    "submit": "createMatter"
  },

  createMatter: function(e) {
    e.preventDefault();
    var task = this.el.elements["task"].value;
    this.collection.create({task: task});
    this.el.reset();
  }
});

var ListView = Backbone.View.extend({
  el: "ul",

  initialize: function() {
    this.listenTo(this.collection, "reset", this.addAll);
    this.listenTo(this.collection, "add", this.addOne);
  },

  addAll: function() {
    this.collection.each(this.addOne.bind(this));
  },

  addOne: function(matter) {
    var view = new MatterView({model: matter});
    this.$el.append(view.el);
  }
});

$(document).ready(function() {
  matters = new MatterCollection();
  listView = new ListView({collection: matters});
  formView = new FormView({collection: matters});
  matters.fetch({ reset: true });
});