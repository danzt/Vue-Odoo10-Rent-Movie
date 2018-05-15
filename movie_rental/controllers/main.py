# -*- coding: utf-8 -*-
from odoo import http
from odoo.addons.web.controllers import main


class Web(main.Home):
    @http.route(["/movie"], auth="user")
    def index_movie_rental(self, **kwargs):
        session_uid = http.request.session.uid

        if not session_uid:
            http.request.session.logout(keep_db=True)
            return http.redirect_with_hash("/")

        return http.request.render("movie_rental.index", {})
