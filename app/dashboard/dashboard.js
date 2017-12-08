'use strict';   

angular.module('exel')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('dashboard', {
    url:'/dashboard',
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController'
  })
  .state('dashboard.categories', {
    url:'/categories',
    templateUrl: 'dashboard/categories/categories.html',
    controller: 'DashboardCategoriesController'
  })
  .state('dashboard.products', {
    url:'/products',
    templateUrl: 'dashboard/products/products.html',
    controller: 'DashboardProductsController'
  })
  .state('dashboard.addproduct', {
    url:'/addproduct',
    templateUrl: 'dashboard/products/addProduct.html',
    controller: 'DashboardAddProductController'
  })
  .state('dashboard.editproduct', {
    url:'/editproduct/:productId',
    templateUrl: 'dashboard/products/addProduct.html',
    controller: 'DashboardAddProductController'
  })
  .state('dashboard.makers', {
    url:'/makers',
    templateUrl: 'dashboard/makers/makers.html',
    controller: 'DashboardMakersController'
  })
  .state('dashboard.addmaker', {
    url:'/addmaker',
    templateUrl: 'dashboard/makers/addMaker.html',
    controller: 'DashboardAddMakerController'
  })
  .state('dashboard.editmaker', {
    url:'/editmaker/:makerId',
    templateUrl: 'dashboard/makers/addMaker.html',
    controller: 'DashboardAddMakerController'
  })
  .state('dashboard.orders', {
    url:'/orders',
    templateUrl: 'dashboard/orders/orders.html',
    controller: 'DashboardOrdersController'
  })
  .state('dashboard.order', {
    url:'/orders/order/:orderId',
    templateUrl: 'dashboard/orders/order.html',
    controller: 'DashboardOrdersController'
  })
  .state('dashboard.team', {
    url:'/team',
    templateUrl: 'dashboard/team/team.html',
    controller: 'DashboardTeamController'
  })
  .state('dashboard.addsubcat', {
    url:'/addsubcat/:catId',
    templateUrl: 'dashboard/categories/addSubcat.html',
    controller: 'DashboardCategoriesController'
  })
  .state('dashboard.addssubcat', {
    url:'/addssubcat/:subcatId',
    templateUrl: 'dashboard/categories/addSsubcat.html',
    controller: 'DashboardCategoriesController'
  })
  .state('dashboard.editsubcat', {
    url:'/editsubcat/:subcatId',
    templateUrl: 'dashboard/categories/addSubcat.html',
    controller: 'DashboardCategoriesController'
  })
  .state('dashboard.editssubcat', {
    url:'/editssubcat/:ssubcatId',
    templateUrl: 'dashboard/categories/addSsubcat.html',
    controller: 'DashboardCategoriesController'
  })
  .state('dashboard.addmember', {
    url:'/addmember',
    templateUrl: 'dashboard/team/addMember.html',
    controller: 'DashboardAddMemberController'
  })
  .state('dashboard.editmember', {
    url:'/editmember/:memberId',
    templateUrl: 'dashboard/team/addMember.html',
    controller: 'DashboardAddMemberController'
  })
}])

.controller('DashboardController', ['$scope', '$http', '$q', '$modal', function($scope, $http, $q, $modal) {

    $scope.options = {
        height: 500,
        focus: true,

        toolbar: [
        ['edit',['undo','redo']],
        ['headline', ['style']],
        ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
    // ['fontface', ['fontname']],
    ['textsize', ['fontsize']],
    ['fontclr', ['color']],
    ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
    ['height', ['height']],
    ['insert', ['link','picture','video','hr', 'table']],
    ['view', ['fullscreen', 'codeview']],
    ['help', ['help']]
    ]
};

$scope.imageUpload = function(file) {
        sendFile(file[0]);
    }

$scope.paste = function(e) { 
    console.log('Called event paste'); 
}

function sendFile(file) {
    var data = new FormData();
    data.append("file", file);
    $.ajax({
        data: data,
        type: "POST",
        url: "api/summerUpload.php",
        cache: false,
        contentType: false,
        processData: false,
        success: function(url) {
            $('#summernote').summernote('insertImage', url);
        }
    });
};

}])

.controller('ConfirmController', ['$scope',  '$modalStack', 'confirmService', 'message', function($scope, $modalStack, confirmService, message) { 
    $scope.message = message;
    $scope.answerSubmit = function(answer) {
        confirmService.confirmResolve(answer);
    }
}])

.controller('CropController', ['$scope', '$http', '$modalInstance', '$animate', 'blob', 'Cropper', '$timeout', 'cropWidth', 'aspectRatio', '$modalStack', 'cropperService', function($scope, $http, $modalInstance, $animate, blob, Cropper, $timeout, cropWidth, aspectRatio, $modalStack, cropperService) {

    $scope.blob = blob;
    $scope.cropWidth = cropWidth;
    $scope.aspectRatio = aspectRatio;
    var file, data;

    Cropper.encode((file = blob)).then(function(dataUrl) {
        $scope.dataUrl = dataUrl;
        $timeout(showCropper);
    });

    $scope.cropper = {};
    $scope.cropperProxy = 'cropper.first';

    $scope.preview = function() {
        if (!file || !data) return;
        Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
          ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
          cropperService.imageData.cropped = dataUrl;
      });
    };

    $scope.clear = function(degrees) {
        if (!$scope.cropper.first) return;
        $scope.cropper.first('clear');
    };

    $scope.scale = function(width) {
        Cropper.crop(file, data)
        .then(function(blob) {
            return Cropper.scale(blob, {width: $scope.cropWidth});
        })
        .then(Cropper.encode).then(function(dataUrl) {
            ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
        });
    }

    $scope.sendFile = function(file) {
        cropperService.sendImage(file);
        $modalStack.dismissAll()
    }

    $scope.showEvent = 'show';
    $scope.hideEvent = 'hide';

    $scope.options = {
        maximize: true,
        aspectRatio: $scope.aspectRatio,
        crop: function(dataNew) {
            data = dataNew;
        }
    };

    function showCropper() { $scope.$broadcast($scope.showEvent); }
    function hideCropper() { $scope.$broadcast($scope.hideEvent); }

}])

.controller('DashboardCategoriesController', ['$scope', '$http', '$location', '$timeout', '$modal', '$stateParams', 'cropperService', '$modalStack', 'catService', 'confirmService', function($scope, $http, $location, $timeout, $modal, $stateParams, cropperService, $modalStack, catService, confirmService) {

    $scope.categoryId = $stateParams.catId;
    $scope.subcatId = $stateParams.subcatId;
    $scope.subcategory = {};
    $scope.subcategory.c_id = $scope.categoryId;
    
    $scope.subcategoryId = $stateParams.subcatId;
    $scope.ssubcatId = $stateParams.ssubcatId;
    $scope.ssubcategory = {};
    $scope.ssubcategory.s_id = $scope.subcatId;

    if ($scope.subcatId) {
        catService.getSubcat($scope.subcatId).then(function(data){
            $scope.subcategory = data;
        })
    }

    if ($scope.ssubcatId) {
        catService.getSsubcat($scope.ssubcatId).then(function(data){
            $scope.ssubcategory = data;
        })
    }

    catService.getCats().then(function(data){
        $scope.categories = data;
        console.log($scope.categories);
    });

    $scope.category = {};

    $scope.catModal = function() {
        $scope.modalInstance = $modal.open({
            templateUrl: 'dashboard/modals/catModal.html',
            size: 'lg',
            scope: $scope	     
        })
    };

    $scope.createCategory = function(category) {
        catService.createCat(category).then(function(data){
            $scope.message = data;
            $modalStack.dismissAll();
            catService.getCats().then(function(data){
                $scope.categories = data;
                $scope.category = {};
            });
        })
    }

    $scope.createSubcategory = function(subcategory) {
        if ($scope.categoryId) {
            catService.createSubcat(subcategory).then(function(data){
                $location.path('dashboard/categories');
            });
        } else {
            catService.editSubсat(subcategory).then(function(data){
                $location.path('dashboard/categories');
            });
        }        
    }

    $scope.createSsubcategory = function(ssubcategory) {
        if ($scope.subcatId) {
            catService.createSsubcat(ssubcategory).then(function(data){
                $location.path('dashboard/categories');
            });
        } else {
            catService.editSsubсat(ssubcategory).then(function(data){
                $location.path('dashboard/categories');
            });
        }        
    }

    $scope.deleteCategory = function(category, index) {
        var message = "Ви справді бажаєте видалити категорію " + category.title + " та всі її підкатегорії?";
        var id = category.c_id;
         confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                catService.deleteCategory(id).then(function(data){
                    $scope.categories.splice(index, 1);
                    $modalStack.dismissAll();
                });
            } else {
                $modalStack.dismissAll();
            }
         });
    }

    $scope.deleteSubcategory = function(subcategory, parentIndex, index) {
        var id = subcategory.s_id;
        var message = "Ви справді бажаєте видалити підкатегорію " + subcategory.title + " ?";
        confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                catService.deleteSubcat(id).then(function(data){
                    $scope.categories[parentIndex].subcats.splice(index, 1);
                    $modalStack.dismissAll();
                });
            } else {
                $modalStack.dismissAll();
            }
        });

    }

    $scope.deleteSsubcategory = function(ssubcategory, parentIndex, index) {
        var id = ssubcategory.ss_id;
        var message = "Ви справді бажаєте видалити підкатегорію " + ssubcategory.title + " ?";
        confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                catService.deleteSsubcat(id).then(function(data){
                    $scope.categories[parentIndex].subcats.splice(index, 1);
                    $modalStack.dismissAll();
                });
            } else {
                $modalStack.dismissAll();
            }
        });

    }

    $scope.triggerInput = function() {
            $('#photo-input').click();    
    }

    $scope.onFile = function(file) {
        cropperService.openCropper(file, 1.6, 900).then(function(data){
            $('#photo-input').val(null);
            $scope.subcategory.images = data;
            $scope.ssubcategory.images = data;
        });
    }

    $scope.deletePhoto = function(index) {
        $scope.subcategory.images = null;
        $scope.ssubcategory.images = null;
    }

}])

.controller('DashboardProductsController', ['$scope', '$modalStack', 'productsService', 'confirmService', 'catService', function($scope, $modalStack, productsService, confirmService, catService) {
///////////////// Підгрузка категорій для створення товару
    catService.getCats().then(function(data){
        $scope.categories = data;
    });

    $scope.getSubcatsList = function() {
         $scope.subSubcatsList = null;
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].c_id === $scope.product.c_id) {
                $scope.subcatsList = $scope.categories[i].subcats;
                console.log($scope.subcatsList)
                break
            }
        }
    }

    $scope.getSubSubcatsList = function() {
        for (var i = 0; i < $scope.subcatsList.length; i++) {
            if ($scope.subcatsList[i].s_id === $scope.product.s_id) {
                $scope.subSubcatsList = $scope.subcatsList[i].subcats;
                console.log($scope.subSubcatsList)
                break
            }
        }
    }
//////////////////////////////////////////////////Фільтр по категоріях
    $scope.onSelectOptionChanged = function() {
        $scope.products.length = 0;
        $scope.filterMore();
    }

    $scope.products = [];
    $scope.loadMore = function() {

        var params = {
        limit: 20,
        offset: $scope.products.length        
        }

        productsService.getProducts(params).then(function(response) {
                console.log(response);
            if (response) {

                for (var i =0; i < response.length; i++) {

                $scope.products.push(response[i]);

                }
            }
        })
    }
    $scope.loadMore();


    $scope.filterMore = function() {

        var params = {
        limit: 50,
        offset: $scope.products.length
             
        }

        if ($scope.title) {
            params.title = $scope.title
        }
        if ($scope.product.c_id) {
            params.c_id = $scope.product.c_id
        }
        if ($scope.product.s_id) {
            params.s_id = $scope.product.s_id
        }
        if ($scope.product.ss_id) {
            params.ss_id = $scope.product.ss_id
        }

        productsService.getListByCategoryId(params).then(function(response) {
                console.log(response);
            if (response) {

                for (var i =0; i < response.length; i++) {

                $scope.products.push(response[i]);

                }
            }
        })
    }

    $scope.title = null;

    $scope.cleanFilter = function() {
        $scope.products.length = 0;
        $scope.product = null;
        $scope.title = null;
        $scope.loadMore();
    }


/////////////////////////////////////////////////////////
    $scope.deleteProduct = function(product, index) {
        var message = "Ви справді бажаєте видалити товар " + product.title + " ?";
        confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                productsService.deleteProduct(product.id).then(function(data){
                    $scope.products.splice(index, 1);
                    $modalStack.dismissAll();
                })    
            } else {
                $modalStack.dismissAll();
            }
        })        
    }


}])


.controller('DashboardMakersController', ['$scope', '$modalStack', 'filtersService', 'confirmService', 'catService', function($scope, $modalStack, filtersService, confirmService, catService) {
   

    catService.getCats().then(function(data){
        $scope.categories = data;
    });

    $scope.getSubcatsList = function() {
         $scope.subSubcatsList = null;
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].c_id === $scope.maker.c_id) {
                $scope.subcatsList = $scope.categories[i].subcats;
                console.log($scope.subcatsList)
                break
            }
        }
    }

    $scope.getSubSubcatsList = function() {
        for (var i = 0; i < $scope.subcatsList.length; i++) {
            if ($scope.subcatsList[i].s_id === $scope.maker.s_id) {
                $scope.subSubcatsList = $scope.subcatsList[i].subcats;
                console.log($scope.subSubcatsList)
                break
            }
        }
    }



    $scope.makers = [];

    $scope.onSelectOptionChanged = function() {
        $scope.makers.length = 0;
        $scope.loadMore();
    }

    $scope.loadMore = function() {

        var params = {
        limit: 20,
        offset: $scope.makers.length,
        s_id: $scope.maker.s_id      
        }

        if ($scope.maker.ss_id) {
            params.ss_id = $scope.maker.ss_id
        }

        filtersService.getListBySubCategoryId(params).then(function(response) {
                console.log(response);
            if (response) {

                for (var i =0; i < response.length; i++) {

                $scope.makers.push(response[i]);

                }
            }
        })
    }
   // $scope.loadMore();

    $scope.cleanFilter = function() {
        $scope.makers.length = 0;
        $scope.maker = null;

    }





    $scope.deleteMaker = function(maker, index) {
        var message = "Ви справді бажаєте видалити виробника " + maker.name + " ?";
        confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                filtersService.deleteMaker(maker.id).then(function(data){
                    $scope.makers.splice(index, 1);
                    $modalStack.dismissAll();
                })    
            } else {
                $modalStack.dismissAll();
            }
        })        
    }

}])



.controller('DashboardOrdersController', ['$scope', '$modalStack', 'ordersService', 'confirmService', '$stateParams', function($scope, $modalStack, ordersService, confirmService, $stateParams) {
    
    if ($stateParams.orderId) {
        ordersService.getOrder($stateParams.orderId).then(function(data){
        $scope.order = data;
        console.log($scope.order);
        })
    }

    $scope.orders = [];
    $scope.loadMore = function() {

        var params = {
        limit: 5,
        offset: $scope.orders.length        
        }

        ordersService.getOrders(params).then(function(response) {
                console.log(response);
            if (response) {

                for (var i =0; i < response.length; i++) {

                $scope.orders.push(response[i]);

                }
            }
        })
    }
    $scope.loadMore();

}])

.controller('DashboardAddProductController', ['$scope', '$stateParams', '$location', 'cropperService', 'productsService', 'catService', 'filtersService', function($scope, $stateParams, $location, cropperService, productsService, catService, filtersService) {
    $scope.product = {};

    if ($stateParams.productId) {
        productsService.getProduct($stateParams.productId).then(function(data){
            $scope.product = data;
        }) 
    }

    catService.getCats().then(function(data){
        $scope.categories = data;
        if ($stateParams.productId) {
            productsService.getProduct($stateParams.productId).then(function(data){
                $scope.product = data;  
                $scope.getSubcatsList();
            })
        };
    });

    $scope.getSubcatsList = function() {
         $scope.subSubcatsList = null;
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].c_id === $scope.product.c_id) {
                $scope.subcatsList = $scope.categories[i].subcats;
                console.log($scope.subcatsList)
                break
            }
        }
    }

    $scope.getSubSubcatsList = function() {
        for (var i = 0; i < $scope.subcatsList.length; i++) {
            if ($scope.subcatsList[i].s_id === $scope.product.s_id) {
                $scope.subSubcatsList = $scope.subcatsList[i].subcats;
                console.log($scope.subSubcatsList)
                break
            }
        }
    }
 
    $scope.submitProduct = function(product) {
        var dataToSend = $scope.getData(product);
        
        if ($stateParams.productId) {
            productsService.editProduct(dataToSend).then(function(data){
                $location.path('dashboard/products');
            })
        } else {
            productsService.createProduct(dataToSend).then(function(data){
                $location.path('dashboard/products')
            })
        }
    }

    $scope.getData = function(product) {
        var data = {};
        
        if (product.id) {
            data.id = product.id;
        }
        if (product.title) {
            data.title = product.title;
        }
        if (product.spec) {
            data.spec = product.spec;
        }
        if (product.price) {
            data.price = product.price;
        }   
        if (product.c_id) {
            data.c_id = product.c_id;
        }
        if (product.s_id) {
            data.s_id = product.s_id;
        }
        if (product.ss_id) {
            data.ss_id = product.ss_id;
        }
        if (product.maker) {
            data.maker = product.maker;
        }
        if (product.image) {
            data.image = product.image;
        } 
        if (product.text) {
            data.text = product.text;
        }
        return data;

    }

    $scope.triggerInput = function() {
        $('#photo-input').click();
    }

    $scope.onFile = function(file) {
        cropperService.openCropper(file, 1.6, 900).then(function(data){
            $('#photo-input').val(null);
            $scope.product.image = data;
        });
    }

    $scope.deletePhoto = function(index) {
        $scope.product.image = null;
    }

}])

.controller('DashboardAddMakerController', ['$scope', '$stateParams', '$location', 'catService', 'filtersService', function($scope, $stateParams, $location, catService, filtersService) {
    $scope.maker = {};

    if ($stateParams.makerId) {
        filtersService.getMaker($stateParams.makerId).then(function(data){
            $scope.maker = data;
        }) 
    }

    catService.getCats().then(function(data){
        $scope.categories = data;
        if ($stateParams.makerId) {
            filtersService.getMaker($stateParams.makerId).then(function(data){
                $scope.maker = data;  
                $scope.getSubcatsList();
            })
        };
    });

    $scope.getSubcatsList = function() {
         $scope.subSubcatsList = null;
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].c_id === $scope.maker.c_id) {
                $scope.subcatsList = $scope.categories[i].subcats;
                console.log($scope.subcatsList)
                break
            }
        }
    }

    $scope.getSubSubcatsList = function() {
        for (var i = 0; i < $scope.subcatsList.length; i++) {
            if ($scope.subcatsList[i].s_id === $scope.maker.s_id) {
                $scope.subSubcatsList = $scope.subcatsList[i].subcats;
                console.log($scope.subSubcatsList)
                break
            }
        }
    }
 
    $scope.submitMaker = function(maker) {
        var dataToSend = $scope.getData(maker);
        
        if ($stateParams.makerId) {
            filtersService.editMaker(dataToSend).then(function(data){
                $location.path('dashboard/makers');
            })
        } else {
            filtersService.createMaker(dataToSend).then(function(data){
                $location.path('dashboard/makers')
            })
        }
    }

    $scope.getData = function(maker) {
        var data = {};
        
        if (maker.id) {
            data.id = maker.id;
        }
        if (maker.name) {
            data.name = maker.name;
        }
        if (maker.c_id) {
            data.c_id = maker.c_id;
        }
        if (maker.s_id) {
            data.s_id = maker.s_id;
        }
        if (maker.ss_id) {
            data.ss_id = maker.ss_id;
        }
        return data;

    }

}])

.controller('DashboardTeamController', ['$scope', '$modalStack', 'confirmService', 'teamService', function($scope, $modalStack, confirmService, teamService) {

    teamService.getMembers().then(function(data){
        $scope.team = data;
        console.log(data);
    })

    $scope.deleteMember = function(member, index) {
        var message = "Ви справді бажаєте видалити з команди " + member.name + " ?";
        confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                teamService.deleteMember(member.id).then(function(data){
                    $scope.team.splice(index, 1);
                    $modalStack.dismissAll();
                })    
            } else {
                $modalStack.dismissAll();
            }
        })        
    }

}])

.controller('DashboardAddMemberController', ['$scope', '$location', '$stateParams', 'cropperService', 'teamService', function($scope, $location, $stateParams, cropperService, teamService) {

    $scope.member = {};

    if ($stateParams.memberId) {
        teamService.getMember($stateParams.memberId).then(function(data){
            $scope.member = data;
            
        })
    }

    $scope.submitMember = function(member) {
        if ($stateParams.memberId) {
            teamService.editMember(member).then(function(data){
                $location.path('dashboard/team');
            })
        } else {
            teamService.createMember(member).then(function(data){
                $location.path('dashboard/team');
            })
        }
    }

    $scope.triggerInput = function() {
        $('#photo-input').click();
    }

    $scope.onFile = function(file) {
        cropperService.openCropper(file, 1, 900).then(function(data){
            $('#photo-input').val(null);
            $scope.member.image = data;
        });
    }

    $scope.deletePhoto = function(index) {
        $scope.member.image = null;
    }

}])











