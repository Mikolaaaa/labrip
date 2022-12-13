import site
from django.contrib import admin
from voencomat import views as voencom_views
from django.urls import include, path
from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'komissar', voencom_views.KomissarViewSet)
router.register(r'prizivniki', voencom_views.PrizivnikiViewSet)
router.register(r'categoriya',voencom_views.CategoriyaViewSet)
router.register(r'voencomati', voencom_views.VoencomatiViewSet)
# router.register(r'aut', voencom_views.authViewSet)
router.register(r'cart', voencom_views.cartViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

]
