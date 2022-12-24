import site
from django.contrib import admin
from voencomat import views as voencom_views
from django.urls import include, path
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'komissar', voencom_views.KomissarViewSet)
router.register(r'prizivniki', voencom_views.PrizivnikiViewSet)
router.register(r'mega', voencom_views.MegaViewSet)
router.register(r'categoriya',voencom_views.CategoriyaViewSet)
router.register(r'voencomati', voencom_views.VoencomatiViewSet)
router.register(r'status', voencom_views.statusViewSet)
router.register(r'cart', voencom_views.cartViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('statusch/<int:id>/', voencom_views.statuschange),
    path('otsrochkach/<int:id>/', voencom_views.otsrochkachange),
    path('del/<int:id>/', voencom_views.delArmiya),
    path('delPr/<int:id>/', voencom_views.delPriziv),
    path('addPr/', voencom_views.create_prizivnik)
]
