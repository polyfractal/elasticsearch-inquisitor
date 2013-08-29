

function MappingCtrl($scope, $http, Mapping, Data){
  $scope.mapping = Mapping;
  $scope.settings = [
    {name:'number_of_shards', defaultValue:5},
    {name:'number_of_replicas', defaultValue:1},
  ];

  //'float', 'double', 'integer', 'long', 'short', 'byte'

  $scope.fields = [
    {type:'integer', name:'my_field', options:[
      {name: 'index_name', value:''},
      {name: 'store', value:'no'},
      {name: 'index', value:'no'},
      {name: 'precision_step', value:4},
      {name: 'boost', value:1.0},
      {name: 'null_value', value:''},
      {name: 'include_in_all', value:'true'},
    ]},
    {type:'long', name:'my_field', options:[
      {name: 'index_name', value:''},
      {name: 'store', value:'no'},
      {name: 'index', value:'no'},
      {name: 'precision_step', value:4},
      {name: 'boost', value:1.0},
      {name: 'null_value', value:''},
      {name: 'include_in_all', value:'true'},
    ]},
    {type:'float', name:'my_field', options:[
      {name: 'index_name', value:''},
      {name: 'store', value:'no'},
      {name: 'index', value:'no'},
      {name: 'precision_step', value:4},
      {name: 'boost', value:1.0},
      {name: 'null_value', value:''},
      {name: 'include_in_all', value:'true'},
    ]},
    {type:'double', name:'my_field', options:[
      {name: 'index_name', value:''},
      {name: 'store', value:'no'},
      {name: 'index', value:'no'},
      {name: 'precision_step', value:4},
      {name: 'boost', value:1.0},
      {name: 'null_value', value:''},
      {name: 'include_in_all', value:'true'},
    ]},
    {type:'short', name:'my_field', options:[
      {name: 'index_name', value:''},
      {name: 'store', value:'no'},
      {name: 'index', value:'no'},
      {name: 'precision_step', value:4},
      {name: 'boost', value:1.0},
      {name: 'null_value', value:''},
      {name: 'include_in_all', value:'true'},
    ]},
    {type:'byte', name:'my_field', options:[
      {name: 'index_name', value:''},
      {name: 'store', value:'no'},
      {name: 'index', value:'no'},
      {name: 'precision_step', value:4},
      {name: 'boost', value:1.0},
      {name: 'null_value', value:''},
      {name: 'include_in_all', value:'true'},
    ]},
  ];

  $scope.data = Data;

  $scope.settingList = [];
  $scope.typeList = [];

  $scope.addSetting = function(setting) {
    $scope.settingList.push(setting);
  };

  $scope.addType = function(type) {
    $scope.typeList.push({name:'my_type', fields: []});
  };

  $scope.addField = function(type, field) {
    newField = JSON.parse(JSON.stringify(field));
    newField.toggledOptions = [];
    type.fields.push(newField);
  };

  $scope.addOption = function(field, option) {
    field.toggledOptions.push(JSON.parse(JSON.stringify(option)));
  };

}
