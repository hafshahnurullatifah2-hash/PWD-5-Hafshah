const products = [
    { id: 1, nama: "Mouse Wireless Ergonomis", harga: 175000, stok: 8 },
    { id: 2, nama: "Keyboard Armaggeddon RGB", harga: 350000, stok: 10 },
    { id: 3, nama: "Headset Gaming Stereo", harga: 280000, stok: 0 },
    { id: 4, nama: "Webcam Full HD 1080p", harga: 450000, stok: 6 },
    { id: 5, nama: "Powerbank Fast Charge 10000mAh", harga: 220000, stok: 12 },
    { id: 6, nama: "Speaker Portable Bluetooth", harga: 550000, stok: 5 }
];
function renderProducts() {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    products.forEach(product => {
        // Buat card produk
        const card = document.createElement('div');
        card.className = 'product-card';

        // Nama Produk
        const h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(product.nama));
        card.appendChild(h3);

        // Harga Produk
        const pHarga = document.createElement('p');
        pHarga.appendChild(document.createTextNode(`Harga: Rp ${product.harga.toLocaleString('id-ID')}`));
        card.appendChild(pHarga);

        // Stok Produk
        const pStok = document.createElement('p');
        pStok.className = 'product-stok';
        pStok.appendChild(document.createTextNode(`Stok: ${product.stok}`));
        card.appendChild(pStok);

        const button = document.createElement('button');
        button.className = 'btn-add';
        button.setAttribute('data-id', product.id);
        button.appendChild(document.createTextNode('Tambah ke Keranjang'));
        card.appendChild(button);

        container.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', renderProducts);

$(document).ready(function() {
    let cart = [];

    function updateCartUI() {
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.qty;
            totalPrice += item.harga * item.qty;
        });

        $('#cartSummary').text(`Total Item: ${totalItems} | Total Harga: Rp ${totalPrice.toLocaleString('id-ID')}`);
    }

    $(document).on('click', '.btn-add', function() {
        const productId = parseInt($(this).attr('data-id'));
        const product = products.find(p => p.id === productId);

        // Ketentuan 4: alert() jika stok produk habis
        if (product.stok <= 0) {
            alert(`Maaf, stok untuk produk "${product.nama}" sudah habis!`);
            return;
        }

        product.stok -= 1;
        renderPrdStok(); 

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.qty += 1;
            // Update teks quantity pada elemen li yang sudah ada
            $(`#cart-item-${productId}`).find('.item-qty').text(`x${existingItem.qty}`);
        } else {
            cart.push({ id: product.id, nama: product.nama, harga: product.harga, qty: 1 });
            
            // Ketentuan 2 & 3: append() dan fadeIn() saat item masuk ke keranjang
            const listItem = $(`
                <li id="cart-item-${product.id}" style="display: none;">
                    <span>${product.nama} - Rp ${product.harga.toLocaleString('id-ID')} (<span class="item-qty">x1</span>)</span>
                    <button class="btn-remove" data-id="${product.id}">Hapus</button>
                </li>
            `);
            $('#cartList').append(listItem);
            listItem.fadeIn(300);
        }

        updateCartUI();
    });
    function renderPrdStok() {
        const cards = $('.product-card');
        cards.each(function(index) {
            $(this).find('.product-stok').text(`Stok: ${products[index].stok}`);
        });
    }

    $(document).on('click', '.btn-remove', function() {
        const productId = parseInt($(this).attr('data-id'));
        
        if (confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")) {
            const itemLi = $(`#cart-item-${productId}`);
            
            // Kembalikan stok produk
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(c => c.id === productId);
            if (product && cartItem) {
                product.stok += cartItem.qty;
                renderPrdStok();
            }
            cart = cart.filter(item => item.id !== productId);

            itemLi.fadeOut(300, function() {
                $(this).remove();
                updateCartUI();
            });
        }
    });

    $('#btnClear').click(function() {
        if (cart.length === 0) {
            alert("Keranjang belanja masih kosong.");
            return;
        }

        if (confirm("Apakah Anda yakin ingin mengosongkan seluruh keranjang belanja?")) {
            // Kembalikan semua stok
            cart.forEach(cartItem => {
                const product = products.find(p => p.id === cartItem.id);
                if (product) {
                    product.stok += cartItem.qty;
                }
            });
            renderPrdStok();

            cart = [];
            $('#cartList').fadeOut(200, function() {
                $(this).empty().show();
                updateCartUI();
            });
            $('#checkoutResult').hide();
        }
    });

    // Ketentuan 3: animate() atau fadeToggle() pada panel keranjang yang dapat dibuka dan ditutup
    $('#toggleCart').click(function() {
        $('#cartPanel').fadeToggle(300);
    });

    // Ketentuan 4: prompt() saat checkout untuk meminta nama pembeli, lalu tampilkan ringkasan pesanan di halaman
    $('#btnCheckout').click(function() {
        if (cart.length === 0) {
            alert("Keranjang belanja Anda kosong. Tambahkan produk terlebih dahulu.");
            return;
        }

        const namaPembeli = prompt("Masukkan nama Anda untuk proses checkout:");
        if (namaPembeli && namaPembeli.trim() !== "") {
            let ringkasanHTML = `<strong>Ringkasan Pesanan untuk: ${namaPembeli}</strong><br><ul>`;
            let totalHarga = 0;

            cart.forEach(item => {
                let subtotal = item.harga * item.qty;
                totalHarga += subtotal;
                ringkasanHTML += `<li>${item.nama} (x${item.qty}) - Rp ${subtotal.toLocaleString('id-ID')}</li>`;
            });

            ringkasanHTML += `</ul><strong>Total Bayar: Rp ${totalHarga.toLocaleString('id-ID')}</strong><br><span style="color: green;">Terima kasih telah berbelanja!</span>`;

            $('#checkoutResult').html(ringkasanHTML).fadeIn();
        }
    });

    $('#searchProduct').on('keyup', function() {
        const keyword = $(this).val().toLowerCase();

        $('.product-card').each(function() {
            const productName = $(this).find('h3').text().toLowerCase();
            // Gunakan toggle() berdasarkan kecocokan kata kunci
            if (productName.includes(keyword)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});