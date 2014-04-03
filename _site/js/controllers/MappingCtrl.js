
function isUndefined(value) {
  return typeof value === "undefined";
}

function MappingCtrl($scope, $http, Mapping, Data){
  $scope.mapping = Mapping;
  $scope.settings = [
    {name:'number_of_shards', value:5},
    {name:'number_of_replicas', value:1},
  ];

  //'float', 'double', 'integer', 'long', 'short', 'byte'

  $scope.fields = [
    {type:'string', name:'my_field', options:[
      {name: 'index_name', value:''},
      {name: 'store', value:'no'},
      {name: 'index', value:'no'},
      {name: 'term_vector', value:'no'},
      {name: 'boost', value:1.0},
      {name: 'null_value', value:''},
      {name: 'include_in_all', value:'true'},
      {name: 'omit_norms', value:'false'},
      {name: 'index_options', value:'positions'},
      {name: 'analyzer', value:''},
      {name: 'index_analyzer', value:''},
      {name: 'search_analyzer', value:''},
      {name: 'ignore_above', value:''},
      {name: 'position_offset_gap', value:0}
    ]},
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
  $scope.parsedMapping = '';

  $scope.$watch('settingList', function(value) {
    $scope.updateParsedMapping();
  }, true);

  $scope.$watch('typeList', function(value) {
    $scope.updateParsedMapping();
  }, true);

  $scope.updateParsedMapping = function() {
    mappingObj = {settings: {}, mappings: {}};
    for (index in $scope.settingList) {
      mappingObj.settings[$scope.settingList[index].name] = $scope.settingList[index].value;
    }

    for (i in $scope.typeList) {
      typeName = $scope.typeList[i].name;
      mappingObj.mappings[typeName] = {properties: {}};

      if (!isUndefined($scope.typeList[i].fields) && $scope.typeList[i].fields.length > 0 ) {
        for (j in $scope.typeList[i].fields) {
          fieldName = $scope.typeList[i].fields[j].name;
          mappingObj.mappings[typeName].properties[fieldName] = {type:  $scope.typeList[i].fields[j].type};
          for (k in $scope.typeList[i].fields[j].toggledOptions) {
            toggledOption = $scope.typeList[i].fields[j].toggledOptions[k].name;
            mappingObj.mappings[typeName].properties[fieldName][toggledOption] = $scope.typeList[i].fields[j].toggledOptions[k].value;
          }
          //mappingObj.mappings[typeName].properties[fieldName]
        }
      }

    }

    $scope.parsedMapping = JSON.stringify(mappingObj);
  };

  $scope.addSetting = function(setting) {
    $scope.settingList.push(JSON.parse(JSON.stringify(setting)));
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
