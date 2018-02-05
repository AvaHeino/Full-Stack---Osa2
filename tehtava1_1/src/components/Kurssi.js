import React from 'react'

const Otsikko = ({kurssi}) => {
	return (
		<h1>{kurssi.nimi}</h1>
		)
}

const Sisalto = ({kurssi}) => {
	return (
	<table>
		{kurssi.osat.map(osa=><Osa key={osa.id} osat={osa}/> )}
	</table>
	)
}
const Osa = ({osat}) => {
	return (
		<tbody>
			<tr>
				<td>{osat.nimi}</td>
				<td>{osat.tehtavia}</td>
			</tr>
		</tbody>
		)
}

const Yhteensa = ({kurssi}) => {

	const tehtavia = kurssi.osat.map(osa=>osa.tehtavia)
	const reducer = (value, valueToAdd) => value + valueToAdd;
	const tehtavienMaara = tehtavia.reduce(reducer)

	return	(
		<p>Yhteensa {tehtavienMaara}</p>
	)
}

const Kurssi = ({kurssi}) => {
	return (
		<div>
			<Otsikko kurssi={kurssi}/>
			<Sisalto kurssi={kurssi}/>
			<Yhteensa kurssi={kurssi}/>
		</div>
		)
}

const Kurssit = ({kurssit}) => {
	return(
		kurssit.map(kurssi => Kurssi({kurssi}))
		)
}
export default Kurssit