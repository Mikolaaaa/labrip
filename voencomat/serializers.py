from voencomat.models import Komissar, Prizivniki, Categoriya, Voencomati, auth, cart, AuthUser, status
from rest_framework import serializers
from django_filters import rest_framework as filter


class statusSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = status
        # Поля, которые мы сериализуем
        fields = ["pk", "tek_znach"]
class KomissarSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Komissar
        # Поля, которые мы сериализуем
        fields = ["pk", "surname", "name", "patronymic", "rang"]


class PrizivnikiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prizivniki
        fields = ["pk", "name", "surname", "patronymic", "vozrast", "otsrochka", "adress", "categoriya"]


class CategoriyaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoriya
        fields = ["pk", "znachenie"]


class VoencomatiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voencomati
        fields = ["pk", "name", "metro", "adress"]


class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = auth
        fields = ["pk", "name", "email", "password"]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = ["pk", "name", "surname", "vozrast", "categoriya", "status"]


class MegaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ["pk", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined"]


class CharFilterInFilter(filter.BaseInFilter, filter.CharFilter):
    pass


class PrizivnikiFilter(filter.FilterSet):
    surname = CharFilterInFilter(field_name='surname', lookup_expr='in')
    vozrast = filter.RangeFilter()

    class Meta:
        model = Prizivniki
        fields = ['vozrast', 'surname']


class CartFilter(filter.FilterSet):
    status = CharFilterInFilter(field_name='status', lookup_expr='in')
    vozrast = filter.RangeFilter()

    class Meta:
        model = cart
        fields = ['vozrast', 'status']
