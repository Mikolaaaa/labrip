from django.contrib.auth import forms
from rest_framework import viewsets
from rest_framework.decorators import api_view
import json

from voencomat.serializers import KomissarSerializer, PrizivnikiSerializer, CategoriyaSerializer, VoencomatiSerializer, AuthSerializer, CartSerializer, MegaSerializer, statusSerializer, OtsluzhivshieSerializer
from voencomat.models import Komissar, Prizivniki, Categoriya, Voencomati, auth, cart, AuthUser, status, Otsluzhivshie
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


class OtsluzhivshieViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Otsluzhivshie.objects.all().order_by('surname')
    serializer_class = OtsluzhivshieSerializer  # Сериализатор для модели
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
        head = request.headers
        log = head["username"]
        token = head["Authorization"]
        if (log != "undefind") and (token != "undefind"):
            statusid = body["status"]
            date_ozhid = body["date_ozhid"]
            date_proh = body["date_proh"]
            date_kon = body["date_kon"]
            date_got = body["date_got"]
            date_nach = body["date_nach"]
            priziv_by_id = cart.objects.get(id=id)
            priziv_by_id.status = statusid
            priziv_by_id.date_ozhid = date_ozhid
            priziv_by_id.date_proh = date_proh
            priziv_by_id.date_kon = date_kon
            priziv_by_id.date_got = date_got
            priziv_by_id.date_nach = date_nach
            priziv_by_id.save()
            return HttpResponse('{"status": "ok"')
        else:
            return HttpResponse('{"status": "Access denied"}')


"""@api_view(['PUT'])
def statuschangePr(request, id):
    if request.method == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        statusid = body["status"]
        priziv_by_id = Prizivniki.objects.get(id=id)
        priziv_by_id.status = statusid
        priziv_by_id.save()
    return HttpResponse('{"status": "ok"')"""


@api_view(['PUT'])
def otsrochkachange(request, id):
    if request.method == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        head = request.headers
        log = head["username"]
        token = head["Authorization"]
        if (log != "undefind") and (token != "undefind"):
            otsrochkaid = body["otsrochka"]
            priziv_by_id = Prizivniki.objects.get(id=id)
            priziv_by_id.otsrochka = otsrochkaid
            priziv_by_id.save()
            return HttpResponse('{"status": "ok"')
        else:
            return HttpResponse('{"status": "Access denied"}')


@api_view(['PUT'])
def prizivnikchange(request, id):
    if request.method == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        head = request.headers
        log = head["username"]
        token = head["Authorization"]
        if (log != "undefind") and (token != "undefind"):
            name = body["name"]
            surname = body["surname"]
            vozrast = int(body["vozrast"])
            categoriya = body["categoriya"]
            adress = body["adress"]
            otsrochka = body["otsrochka"]
            patronymic = body["patronymic"]
            priziv_by_id = Prizivniki.objects.get(id=id)
            priziv_by_id.name = name
            priziv_by_id.surname = surname
            priziv_by_id.vozrast = vozrast
            priziv_by_id.categoriya = categoriya
            priziv_by_id.adress = adress
            priziv_by_id.otsrochka = otsrochka
            priziv_by_id.patronymic = patronymic
            priziv_by_id.save()
            return HttpResponse('{"status": "ok"')
        else:
            return HttpResponse('{"status": "Access denied"}')


@api_view(['DELETE'])
def delArmiya(request, id):
    head = request.headers
    log = head["username"]
    token = head["Authorization"]
    if (log != "undefind") and (token != "undefind"):
        cart.objects.filter(id=id).delete()
        return HttpResponse('{"status": "ok"')
    else:
        return HttpResponse('{"status": "Access denied"}')


@api_view(['DELETE'])
def delPriziv(request, id):
    head = request.headers
    log = head["username"]
    if log == "megauser":
        Prizivniki.objects.filter(id=id).delete()
        return HttpResponse('{"status": "ok"')
    else:
        return HttpResponse('{"status": "Access denied"}')


@api_view(['DELETE'])
def delPriziv1(request, id):
    head = request.headers
    log = head["username"]
    token = head["Authorization"]
    if (log != "undefind") and (token != "undefind"):
        Prizivniki.objects.filter(id=id).delete()
        return HttpResponse('{"status": "ok"')
    else:
        return HttpResponse('{"status": "Access denied"}')

@api_view(['DELETE'])
def delKomis(request, id):
    body = json.loads(request.body)
    log = body["username"]
    if log == "megauser":
        Komissar.objects.filter(id=id).delete()
        return HttpResponse('{"status": "ok"')
    else:
        return HttpResponse('{"status": "Access denied"}')


@api_view(['DELETE'])
def delVoencomat(request, id):
    body = json.loads(request.body)
    log = body["username"]
    if log == "megauser":
        Voencomati.objects.filter(id=id).delete()
        return HttpResponse('{"status": "ok"')
    else:
        return HttpResponse('{"status": "Access denied"}')


@api_view(["POST"])
def create_prizivnik(request):
    body = json.loads(request.body)
    head = request.headers
    log = head["username"]
    name = body["name"]
    surname = body["surname"]
    vozrast = body["vozrast"]
    categoriya = body["categoriya"]
    adress = body["adress"]
    otsrochka = body["otsrochka"]
    patronymic = body["patronymic"]
    status = body["status"]
    date_ozhid = body["date_ozhid"]
    date_proh = body["date_proh"]
    date_kon = body["date_kon"]
    date_got = body["date_got"]
    date_nach = body["date_nach"]
    token = head["Authorization"]
    if (log != "undefind") and (token != "undefind"):
        p = cart.objects.create(name=name, surname=surname, vozrast=vozrast, categoriya=categoriya, adress=adress, otsrochka=otsrochka, patronymic=patronymic, status=status, date_ozhid=date_ozhid, date_proh=date_proh, date_kon=date_kon, date_got=date_got, date_nach=date_nach)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"вы не можете добавить призывника в армию\"}")


@api_view(["POST"])
def create_komissar(request):
    body = json.loads(request.body)
    head = request.headers
    log = head["username"]
    name = body["name"]
    surname = body["surname"]
    patronymic = body["patronymic"]
    rang = body["rang"]
    print(patronymic)
    if log == "megauser":
        p = Komissar.objects.create(name=name, surname=surname, patronymic=patronymic, rang=rang)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"вы не можете добавить комиссара\"}")


@api_view(["POST"])
def create_voencomat(request):
    body = json.loads(request.body)
    head = request.headers
    log = head["username"]
    name = body["name"]
    metro = body["metro"]
    adress = body["adress"]
    if log == "megauser":
        p = Voencomati.objects.create(name=name, metro=metro, adress=adress)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"вы не можете добавить военкомат\"}")


@api_view(["POST"])
def create_prizivnik1(request):
    body = json.loads(request.body)
    head = request.headers
    log = head["username"]
    name = body["name"]
    surname = body["surname"]
    vozrast = body["vozrast"]
    categoriya = body["categoriya"]
    adress = body["adress"]
    otsrochka = body["otsrochka"]
    patronymic = body["patronymic"]
    token = head["Authorization"]
    if (log != "undefind") and (token != "undefind"):
        p = Prizivniki.objects.create(name=name, surname=surname, vozrast=vozrast, categoriya=categoriya, adress=adress, otsrochka=otsrochka, patronymic=patronymic)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"вы не можете добавить призывника\"}")



@api_view(["POST"])
def create_otsluzhivshiy(request):
    body = json.loads(request.body)
    head = request.headers
    log = head["username"]
    name = body["name"]
    surname = body["surname"]
    vozrast = body["vozrast"]
    categoriya = body["categoriya"]
    adress = body["adress"]
    otsrochka = body["otsrochka"]
    patronymic = body["patronymic"]
    print(body)
    if log == "megauser":
        p = Otsluzhivshie.objects.create(name=name, surname=surname, vozrast=vozrast, categoriya=categoriya, adress=adress, otsrochka=otsrochka, patronymic=patronymic)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"вы не можете добавить призывника\"}")