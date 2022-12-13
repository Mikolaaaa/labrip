from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from voencomat.models import Prizivniki
from .cart import Cart
from .forms import CartAddPrizivnikForm


@require_POST
def cart_add(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Prizivniki, id=product_id)
    form = CartAddPrizivnikForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(product=product,
                 quantity=cd['quantity'],
                 update_quantity=cd['update'])
    return redirect('cart:cart_detail')


def cart_remove(request, prizivniki_id):
    cart = Cart(request)
    product = get_object_or_404(Prizivniki, id=prizivniki_id)
    cart.remove(product)
    return redirect('cart:cart_detail')


def cart_detail(request):
    cart = Cart(request)
    for item in cart:
        item['update_quantity_form'] = CartAddPrizivnikForm(initial={'quantity': item['quantity'],
                                                                   'update': True})
    return render(request, 'cart/detail.html', {'cart': cart})
