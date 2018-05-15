# -*- coding: utf-8 -*-
{
    'name': "movie_rental",
    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com
    """,
    'description': """
        Long description of module's purpose
    """,
    'author': "Daniel Moises",
    'website': "http://www.yourcompany.com",
    'category': 'Vudoo',
    'version': '0.1',
    'depends': [
        'base',
        'website'
    ],
    'data': [
        # 'security/ir.model.access.csv',
        'views/assets.xml',
        'views/templates.xml',
        'views/menu.xml',
        'views/category.xml',
        'views/movie.xml',
        'views/type.xml',
        'views/mr_movie_rental.xml'
    ]
}
