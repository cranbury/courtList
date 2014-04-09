setInterval(reDo, 10000);
benchMode = false;
savedTime = "";
mattersLength = 0;
itemsOnList = 0;


$( init );

function init() {
  $('#sortable').sortable( {
    cursor: 'move',
    containment: 'document',
    start: starts,
    update: ups
  } );
  //sorted = $("#sortable").sortable( "serialize", { key: "sort" } );
}

function starts(e, ui) {
  // creates a temporary attribute on the element with the old index
  $(this).attr('data-previndex', ui.item.index());
}

function ups(e, ui) {
  var newIndex = parseInt(ui.item.index());
  var oldIndex = parseInt($(this).attr('data-previndex'));
  $(this).removeAttr('data-previndex');
  //console.log(oldIndex); console.log(newIndex);
  //console.log(e.target);

  matters.toArray().forEach(function(element, index) {
    recordIndex = element.get('number_on_list');
    if (recordIndex === oldIndex) {
      gak = "AA";
      newNumber = newIndex;
    } else if ((recordIndex < oldIndex && recordIndex < newIndex) || (recordIndex > oldIndex && recordIndex > newIndex)) {
      newNumber = element.get('number_on_list');
      gak = "AB";
    } else if (recordIndex > oldIndex && recordIndex < newIndex) {
      newNumber = element.get('number_on_list') - 1;
      gak = "AC"
    } else {
      newNumber = element.get('number_on_list') + 1;
      gak = "AD";
    }
    element.set('number_on_list', newNumber);
    element.save();
    console.log(gak + newNumber + " "+element.get('number_on_list'));
  });
}
//matters.find(function(model){return model.get('number_on_list') == '24';});

 
function handleDragStop( event, ui ) {
  var posXPos = parseInt( ui.position.left );
  var posYPos = parseInt( ui.position.top );
  var oPosXPos = parseInt( ui.originalPosition.left );
  var oPosYPos = parseInt( ui.originalPosition.top );
  console.log( "Drag stopped!\n\nPosition: (" + posXPos + ", " + posYPos + ")\n" + "difference: (" + (oPosXPos - posXPos) + ", " + (oPosYPos - posYPos) + ")\n");
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
  if (matters.toArray()[0]){
    latestTime = matters.toArray()[0].attributes.updated_at;
  } else {
    latestTime = "";
  }
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
  // tagName: "li",

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
    if(this.model.attributes.number_on_list === 0 || this.model.attributes.number_on_list){
      console.log("already here"); 
      } else {
      this.model.set('number_on_list', numberOnList);
      this.model.save();
    }
    //this.model.save();
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
    this.collection.add({docket_number: docket_number});
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
      
      sortedCollection = this.collection.sortBy(function(el){
        return parseInt(el.get("number_on_list"));
      });
      this.collection.models = sortedCollection;
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