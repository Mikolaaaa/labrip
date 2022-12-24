from django.contrib.auth import forms
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
import json

from voencomat.serializers import KomissarSerializer, PrizivnikiSerializer, CategoriyaSerializer, VoencomatiSerializer, AuthSerializer, CartSerializer, MegaSerializer, statusSerializer
from voencomat.models import Komissar, Prizivniki, Categoriya, Voencomati, auth, cart, AuthUser, status
from django_filters.rest_framework import DjangoFilterBackend
from voencomat.serializers import PrizivnikiFilter, CartFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from django.http import HttpResponse
from rest_framework.response import Response


class statusViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = status.objects.all().order_by('id')
    serializer_class = statusSerializer  # Сериализатор для модели

class MegaViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = AuthUser.objects.all().order_by('username')
    serializer_class = MegaSerializer  # Сериализатор для модели
    permission_classes = (IsAdminUser,)

class KomissarViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Komissar.objects.all().order_by('surname')
    serializer_class = KomissarSerializer  # Сериализатор для модели


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
    queryset = cart.objects.all().order_by('pk')
    serializer_class = CartSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CartFilter
    permission_classes = (IsAuthenticatedOrReadOnly, )


@api_view(['PUT'])
def statuschange(request, id):
    if request.method == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        statusid = body["status"]
        priziv_by_id = cart.objects.get(id=id)
        priziv_by_id.status = statusid
        priziv_by_id.save()
    return HttpResponse('{"status": "ok"')


@api_view(['PUT'])
def statuschangePr(request, id):
    if request.method == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        statusid = body["status"]
        priziv_by_id = Prizivniki.objects.get(id=id)
        priziv_by_id.status = statusid
        priziv_by_id.save()
    return HttpResponse('{"status": "ok"')


@api_view(['PUT'])
def otsrochkachange(request, id):
    if request.method == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        otsrochkaid = body["otsrochka"]
        priziv_by_id = Prizivniki.objects.get(id=id)
        priziv_by_id.otsrochka = otsrochkaid
        priziv_by_id.save()
    return HttpResponse('{"status": "ok"')


@api_view(['DELETE'])
def delArmiya(request, id):
    body = json.loads(request.body)
    ssid = body["session_cookie"]
    if ssid == "a9b7c2262ffcefde2943e9054acbf5788dd5eebb":
        cart.objects.filter(id=id).delete()
        return HttpResponse('{"status": "ok"')
    else:
        return HttpResponse('{"status": "Access denied"}')


@api_view(['DELETE'])
def delPriziv(request, id):
    body = json.loads(request.body)
    ssid = body["session_cookie"]
    if ssid == "a9b7c2262ffcefde2943e9054acbf5788dd5eebb":
        Prizivniki.objects.filter(id=id).delete()
        return HttpResponse('{"status": "ok"')
    else:
        return HttpResponse('{"status": "Access denied"}')


@api_view(["POST"])
def create_prizivnik(request):
    body = json.loads(request.body)
    ssid = body["session_cookie"]
    name = body["name"]
    surname = body["surname"]
    vozrast = body["vozrast"]
    categoriya = body["categoriya"]
    status = body["status"]
    if ssid == "a9b7c2262ffcefde2943e9054acbf5788dd5eebb":
        p = cart.objects.create(name=name, surname=surname, vozrast=vozrast, categoriya=categoriya, status=status)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"вы не можете добавить призывника в армию\"}")
