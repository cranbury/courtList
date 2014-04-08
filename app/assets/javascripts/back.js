setInterval(reDo, 1000);
benchMode = false;
savedTime = "";
mattersLength = 0;


$( init );
 
function init() {
  $('#sortable').sortable( {
    cursor: 'move',
    containment: 'document',
    stop: handleDragStop
  } );
}
 
function handleDragStop( event, ui ) {
  var offsetXPos = parseInt( ui.offset.left );
  var offsetYPos = parseInt( ui.offset.top );
  alert( "Drag stopped!\n\nOffset: (" + offsetXPos + ", " + offsetYPos + ", "+ event.target +")\n");
}

function reDo() {
  if (!benchMode){
    matters.fetch({ reset: true }); }
};

$(function() {
  $( "#draggable" ).draggable();
});

// $(function() {
//   $( "#sortable" ).sortable();
//   $( "#sortable" ).disableSelection();
// });

function shouldUpdate() {
  latestTime = matters.toArray()[0].attributes.updated_at;
  if (mattersLength != matters.toArray().length){
    mattersLength = matters.toArray().length;
    lengthWrong = true;
  } else { lengthWrong = false};

  for (var i = 0; i < matters.toArray().length; i++) {
    var newTime = matters.toArray()[i].attributes.updated_at;
    newTime > latestTime ? latestTime = newTime : latestTime;
  };

  savedTime < latestTime ? returnStuff = true : returnStuff = false;
  if (savedTime < latestTime) {savedTime = latestTime};

  return returnStuff || lengthWrong;
}

var Matter = Backbone.Model.extend({ 
  urlRoot: "/lists/"+window.list_id+"/matters"
});

var MatterCollection = Backbone.Collection.extend({
  model: Matter,
  url: "/lists/"+"1"+"/matters"
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
    var done = $(e.target).is(":checked");
    this.model.set('done', done);
    this.model.save();
  },

  setNumberOnList: function(numberOnList) {
    this.model.set('number_on_list', numberOnList);
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
    var docket_number = this.el.elements["docket_number"].value;
    this.collection.create({docket_number: docket_number});
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
    if(shouldUpdate()){
      itemsOnList = 0;
      $('ul').empty();
      console.log("shouldUpdate");
      this.collection.each(this.addOne.bind(this));
    }
  },

  addOne: function(matter) {
    var view = new MatterView({model: matter});
    this.$el.append(view.el);
    view.setNumberOnList(itemsOnList);
    itemsOnList++;
  }
});

$(document).ready(function() {
  var Matter = Backbone.Model.extend({ 
    urlRoot: "/lists/"+window.list_id+"/matters"
  });

  var MatterCollection = Backbone.Collection.extend({
    model: Matter,
    url: "/lists/"+window.list_id+"/matters"
  });
  matters = new MatterCollection();
  listView = new ListView({collection: matters});
  formView = new FormView({collection: matters});
  matters.fetch({ reset: true });
});