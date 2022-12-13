from django.contrib.auth import forms
from rest_framework import viewsets
from voencomat.serializers import KomissarSerializer, PrizivnikiSerializer, CategoriyaSerializer, VoencomatiSerializer, AuthSerializer, CartSerializer
from voencomat.models import Komissar, Prizivniki, Categoriya, Voencomati, auth, cart
from django_filters.rest_framework import DjangoFilterBackend
from voencomat.serializers import PrizivnikiFilter
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class KomissarViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Komissar.objects.all().order_by('surname')
    serializer_class = KomissarSerializer  # Сериализатор для модели
    #permission_classes = (IsAuthenticated, )


class PrizivnikiViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Prizivniki.objects.all().order_by('surname')
    serializer_class = PrizivnikiSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = PrizivnikiFilter
    permission_classes = (IsAuthenticatedOrReadOnly, )



class CategoriyaViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Categoriya.objects.all().order_by('znachenie')
    serializer_class = CategoriyaSerializer  # Сериализатор для модели
    #permission_classes = (IsAuthenticatedOrReadOnly, )



class VoencomatiViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Voencomati.objects.all().order_by('name')
    serializer_class = VoencomatiSerializer  # Сериализатор для модели
    #permission_classes = (IsAuthenticatedOrReadOnly, )


class authViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = auth.objects.all().order_by('id')
    serializer_class = AuthSerializer  # Сериализатор для модели


class cartViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = cart.objects.all().order_by('name')
    serializer_class = CartSerializer  # Сериализатор для модели
