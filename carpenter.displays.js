const __handlebars = require('handlebars');
module.exports = {
	"gridle-settings" : function(data) {
		if (typeof(data['gridle-min-width']) !== 'string') {
			delete data['gridle-min-width'];
		}
		if (typeof(data['gridle-max-width']) !== 'string') {
			delete data['gridle-max-width'];
		}
		if (typeof(data['gridle-query']) !== 'string') {
			delete data['gridle-query'];
		}
		const template = __handlebars.compile(`
			<div class="gr-12">
				<h3 class="h4 vr t-capitalize">
					{{gridle-name}} State
				</h3>
				<p class="p vr">
					{{body}}
				</p>
				<table class="table table--striped table--hover">
					<thead>
						<tr>
							<th>Property</th>
							<th class="t-right">Value</th>
						</tr>
					</thead>
					<tbody>
						{{#if gridle-min-width}}
							<tr>
								<td>Min width</td>
								<td class="t-right">{{gridle-min-width}}</td>
							</tr>
						{{/if}}
						{{#if gridle-max-width}}
							<tr>
								<td>Max width</td>
								<td class="t-right">{{gridle-max-width}}</td>
							</tr>
						{{/if}}
						{{#if gridle-query}}
							<tr>
								<td>Query</td>
								<td class="t-right">{{gridle-query}}</td>
							</tr>
						{{/if}}
						<tr>
							<td>Classes</td>
							<td class="t-right">{{gridle-classes}}</td>
						</tr>
						<tr>
							<td>Context</td>
							<td class="t-right">{{gridle-context}}</td>
						</tr>
						<tr>
							<td>Gutters width</td>
							<td class="t-right">{{gridle-gutter-width}}</td>
						</tr>
						<tr>
							<td>Gutters height</td>
							<td class="t-right">{{gridle-gutter-height}}</td>
						</tr>
						<tr>
							<td>Gutters top</td>
							<td class="t-right">{{gridle-gutter-top}}</td>
						</tr>
						<tr>
							<td>Gutters right</td>
							<td class="t-right">{{gridle-gutter-right}}</td>
						</tr>
						<tr>
							<td>Gutters bottom</td>
							<td class="t-right">{{gridle-gutter-bottom}}</td>
						</tr>
						<tr>
							<td>Gutters left</td>
							<td class="t-right">{{gridle-gutter-left}}</td>
						</tr>
						<tr>
							<td>Direction</td>
							<td class="t-right">{{gridle-direction}}</td>
						</tr>
						<tr>
							<td>"dir" attribute support</td>
							<td class="t-right">{{gridle-dir-attribute}}</td>
						</tr>
						<tr>
							<td>Name multiplicator</td>
							<td class="t-right">{{gridle-name-multiplicator}}</td>
						</tr>
						<tr>
							<td>States classes</td>
							<td class="t-right">{{gridle-states-classes}}</td>
						</tr>
						<tr>
							<td>Classes prefix</td>
							<td class="t-right">{{gridle-classes-prefix}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		`);
		return template(data);
	}
};
