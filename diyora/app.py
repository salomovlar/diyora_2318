from flask import Flask, render_template, jsonify, request, redirect, url_for
import json

app = Flask(__name__)

# data.json ni yuklash
def load_books():
    try:
        with open('data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

@app.route('/')
def index():
    books = load_books()
    return render_template('index.html', books=books[:4])

@app.route('/katalog')
def katalog():
    books = load_books()
    return render_template('katalog.html', books=books)

@app.route('/onlayn-kitoblar')
def onlayn_kitoblar():
    books = load_books()
    return render_template('onlayn-kitoblar.html', books=books)

@app.route('/buyurtma', methods=['GET', 'POST'])
def buyurtma():
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        address = request.form.get('address')
        # Bu yerda buyurtmani saqlash mumkin (DB ga yozish)
        return redirect(url_for('index'))
    return render_template('buyurtma.html')

@app.route('/biz-haqimizda')
def biz_haqimizda():
    return render_template('biz-haqimizda.html')

@app.route('/aloqa')
def aloqa():
    return render_template('aloqa.html')

@app.route('/api/books')
def api_books():
    books = load_books()
    return jsonify(books)

@app.route('/api/books/<int:book_id>')
def api_book(book_id):
    books = load_books()
    book = next((b for b in books if b['id'] == book_id), None)
    if book:
        return jsonify(book)
    return jsonify({'error': 'Book not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
