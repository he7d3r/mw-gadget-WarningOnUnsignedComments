/**
 * Warning on unsigned comments
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/WarningOnUnsignedComments.js]] ([[File:User:Helder.wiki/Tools/WarningOnUnsignedComments.js]])
 */
/*jslint browser: true, white: true, devel: true*/
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

function validateComments() {
	$( '#wpSave' ).on( 'click', function ( e ) {
		var $textBox = $( '#wpTextbox1' ),
			curText = $textBox.val(),
			signRequired = mw.config.get( 'wgNamespaceNumber' ) % 2 === 1
				|| curText.indexOf( ' (' + 'UTC)' ) !== -1,
			hasSignature = /~{4}(?!<\/nowiki>)/.test( curText ),
			unsignedText = 'Parece que esqueceu de colocar "~~' + '~~" no final da mensagem para assinar o seu comentário. Deseja salvar mesmo assim?';
		if ( signRequired && !hasSignature && !confirm( unsignedText ) ) {
			$textBox.focus();
			e.preventDefault();
			mw.log( 'Não salvar' );
		}
	} );
}
if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ) {
	$( validateComments );
}

}( mediaWiki, jQuery ) );