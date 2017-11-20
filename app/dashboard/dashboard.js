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
  .state('dashboard.news', {
    url:'/news',
    templateUrl: 'dashboard/news/news.html',
    controller: 'DashboardNewsController'
  })
  .state('dashboard.products', {
    url:'/products',
    templateUrl: 'dashboard/products/products.html',
    controller: 'DashboardProductsController'
  })
  .state('dashboard.portfolio', {
    url:'/portfolio',
    templateUrl: 'dashboard/portfolio/portfolio.html',
    controller: 'DashboardPortfolioController'
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
  .state('dashboard.editsubcat', {
    url:'/editsubcat/:subcatId',
    templateUrl: 'dashboard/categories/addSubcat.html',
    controller: 'DashboardCategoriesController'
  })
  .state('dashboard.addarticle', {
    url:'/addarticle',
    templateUrl: 'dashboard/news/addArticle.html',
    controller: 'DashboardAddArticleController'
  })
  .state('dashboard.editarticle', {
    url:'/editarticle/:articleId',
    templateUrl: 'dashboard/news/addArticle.html',
    controller: 'DashboardAddArticleController'
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
  .state('dashboard.addportfolio', {
    url:'/addportfolio',
    templateUrl: 'dashboard/portfolio/addPortfolio.html',
    controller: 'DashboardAddPortfolioController'
  })
  .state('dashboard.editportfolio', {
    url:'/editportfolio/:itemId',
    templateUrl: 'dashboard/portfolio/addPortfolio.html',
    controller: 'DashboardAddPortfolioController'
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

    if ($scope.subcatId) {
        catService.getSubcat($scope.subcatId).then(function(data){
            $scope.subcategory = data;
        })
    }

    catService.getCats().then(function(data){
        $scope.categories = data;
        
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


    $scope.triggerInput = function() {
            $('#photo-input').click();    
    }

    $scope.onFile = function(file) {
        cropperService.openCropper(file, 1.6, 900).then(function(data){
            $('#photo-input').val(null);
            $scope.subcategory.images = data;
        });
    }

    $scope.deletePhoto = function(index) {
        $scope.subcategory.images = null;
    }

}])

.controller('DashboardNewsController', ['$scope', '$modalStack', 'newsService', 'confirmService', function($scope, $modalStack, newsService, confirmService) {
    newsService.getNews().then(function(data){
        $scope.news = data;
    })

    $scope.deleteArticle = function(article, index) {
        var message = "Ви справді бажаєте видалити cтаттю " + article.title + " ?";
        confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                newsService.deleteArticle(article.id).then(function(data){
                    $scope.news.splice(index, 1);
                    $modalStack.dismissAll();
                })    
            } else {
                $modalStack.dismissAll();
            }
        })        
    }

}])

.controller('DashboardProductsController', ['$scope', '$modalStack', 'productsService', 'confirmService', function($scope, $modalStack, productsService, confirmService) {
    productsService.getProducts().then(function(data){
        $scope.products = data;
    })

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




.controller('DashboardAddArticleController', ['$scope', '$stateParams', '$location', 'cropperService', 'newsService', function($scope, $stateParams, $location, cropperService, newsService) {
    $scope.article = {};

    if ($stateParams.articleId) {
        newsService.getArticle($stateParams.articleId).then(function(data){
            $scope.article = data;
        }) 
    }
 
    $scope.submitArticle = function(article) {
        if ($stateParams.articleId) {
            newsService.editArticle(article).then(function(data){
                $location.path('dashboard/news');
            })
        } else {
            newsService.createArticle(article).then(function(data){
                $location.path('dashboard/news')
            })
        }
        
    }

    $scope.triggerInput = function() {
        $('#photo-input').click();
    }

    $scope.onFile = function(file) {
        cropperService.openCropper(file, 1.6, 900).then(function(data){
            $('#photo-input').val(null);
            $scope.article.image = data;
        });
    }

    $scope.deletePhoto = function(index) {
        $scope.article.image = null;
    }

}])



.controller('DashboardAddProductController', ['$scope', '$stateParams', '$location', 'cropperService', 'productsService', 'catService', function($scope, $stateParams, $location, cropperService, productsService, catService) {
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

    $scope.product = {};

    $scope.getSubcatsList = function() {
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].c_id === $scope.product.c_id) {
                $scope.subcatsList = $scope.categories[i].subcats;
                break
            }
        }
    }
 
    $scope.submitProduct = function(product) {
        if ($stateParams.productId) {
            productsService.editProduct(product).then(function(data){
                $location.path('dashboard/products');
            })
        } else {
            productsService.createProduct(product).then(function(data){
                $location.path('dashboard/products')
            })
        }
        
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

    catService.getCats().then(function(data){
  $scope.services = data;
  console.log(data);
})

catService.getCats().then(function(data){
        $scope.categories = data;
        
    });

    $scope.category = {};

}])




.controller('DashboardPortfolioController', ['$scope', '$modalStack', 'portfolioService', 'confirmService', function($scope, $modalStack, portfolioService, confirmService) {
    portfolioService.getItems().then(function(data){
        $scope.items = data;
    })

    $scope.deleteItem = function(item, index) {
        var message = "Ви справді бажаєте видалити елемент " + item.title + " з Вашого портфоліо?";
        confirmService.openConfirm(message).then(function(data){
            if (data === true) {
                portfolioService.deleteItem(item.id).then(function(data){
                    $scope.items.splice(index, 1);
                    $modalStack.dismissAll();
                })    
            } else {
                $modalStack.dismissAll();
            }
        })        
    }
}])

.controller('DashboardAddPortfolioController', ['$scope', '$stateParams', '$location', '$timeout', 'catService', 'cropperService', 'portfolioService', function($scope, $stateParams, $location, $timeout, catService, cropperService, portfolioService) {
    catService.getCats().then(function(data){
        $scope.categories = data;

        if ($stateParams.itemId) {
            portfolioService.getItem($stateParams.itemId).then(function(data){
                $scope.item = data;  
                $scope.getSubcatsList();
            })
        };
    });

    $scope.item = {};

    $scope.getSubcatsList = function() {
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].c_id === $scope.item.c_id) {
                $scope.subcatsList = $scope.categories[i].subcats;
                $timeout(function() {
                    console.log($scope.item.s_id)
                }, 1000);
                break
            }
        }
    }

    $scope.sendPortfolio = function(item) {
        console.log(item);
        if ($stateParams.itemId) {

            portfolioService.editItem(item).then(function(data){
                console.log(data);
                $location.path('dashboard/portfolio');
            })
        } else {
            portfolioService.createItem(item).then(function(data){
                $location.path('dashboard/portfolio');
            })
        }
    }

    $scope.triggerInput = function() {
        if (!$scope.item.images || $scope.item.images.length < 4) {
            $('#photo-input').click();
        } else {
            $scope.maxPhoto = true;
        }
    }

    $scope.onFile = function(file) {
        cropperService.openCropper(file, 1.6, 900).then(function(data){
            $('#photo-input').val(null);
            if (!$scope.item.images) {
                $scope.item.images = [];
            }
            $scope.item.images.push(data);
        });
    }

    $scope.deletePhoto = function(index) {
        $scope.item.images.splice(index, 1);
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











