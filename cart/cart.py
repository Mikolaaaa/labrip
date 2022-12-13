from decimal import Decimal
from django.conf import settings
from voencomat.models import Prizivniki


class Cart(object):

    def __init__(self, request):
        """инициализация корзины"""
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        """сохраняем пустую корзину в сессии"""
        self.cart = cart

    def __iter__(self):
        """
        Перебираем товары в корзине и получаем товары из базы данных.
        """
        prizivniki_ids = self.cart.keys()
        # получаем товары и добавляем их в корзину
        prizivnikis = Prizivniki.objects.filter(id__in=prizivniki_ids)

        cart = self.cart.copy()
        for prizivniki in prizivnikis:
            cart[str(prizivniki.id)]['product'] = prizivniki

        for item in cart.values():
            item['vozrast'] = Decimal(item['vozrast'])
            item['total_vozrast'] = item['vozrast'] * item['quantity']
            yield item

    def __len__(self):
        """
        Считаем сколько товаров в корзине
        """
        return sum(item['quantity'] for item in self.cart.values())

    def add(self, prizivniki, quantity=1, update_quantity=False):
        """
        Добавляем товар в корзину или обновляем его количество.
        """
        prizivniki_id = str(prizivniki.id)
        if prizivniki_id not in self.cart:
            self.cart[prizivniki_id] = {'quantity': 0,
                                      'price': str(prizivniki.vozrast)}
        if update_quantity:
            self.cart[prizivniki_id]['quantity'] = quantity
        else:
            self.cart[prizivniki_id]['quantity'] += quantity
        self.save()

    def save(self):
        # сохраняем товар
        self.session.modified = True

    def remove(self, prizivniki):
        """
        Удаляем товар
        """
        prizivniki_id = str(prizivniki.id)
        if prizivniki_id in self.cart:
            del self.cart[prizivniki_id]
            self.save()

    def get_total_price(self):
        # получаем общую стоимость
        return sum(Decimal(item['vozrast']) * item['quantity'] for item in self.cart.values())

    def clear(self):
        # очищаем корзину в сессии
        del self.session[settings.CART_SESSION_ID]
        self.save()