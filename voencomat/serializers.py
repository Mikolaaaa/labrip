from voencomat.models import Komissar, Prizivniki, Categoriya, Voencomati, auth, cart
from rest_framework import serializers
from django_filters import rest_framework as filter


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
        fields = ["pk", "name", "surname", "vozrast", "categoriya"]


class CharFilterInFilter(filter.BaseInFilter, filter.CharFilter):
    pass


class PrizivnikiFilter(filter.FilterSet):
    surname = CharFilterInFilter(field_name='surname', lookup_expr='in')
    vozrast = filter.RangeFilter()

    class Meta:
        model = Prizivniki
        fields = ['vozrast', 'surname']

