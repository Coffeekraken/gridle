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
						{{#if gridle-columns}}
							<tr>
								<td>Columns</td>
								<td class="t-right">{{gridle-columns}}</td>
							</tr>
						{{/if}}
						{{#if gridle-rows}}
							<tr>
								<td>Rows</td>
								<td class="t-right">{{gridle-rows}}</td>
							</tr>
						{{/if}}
						{{#if gridle-column-width}}
							<tr>
								<td>Column width</td>
								<td class="t-right">{{gridle-column-width}}</td>
							</tr>
						{{/if}}
						{{#if gridle-width}}
							<tr>
								<td>Width</td>
								<td class="t-right">{{gridle-width}}</td>
							</tr>
						{{/if}}
						{{#if gridle-gutter-width}}
							<tr>
								<td>Gutter width</td>
								<td class="t-right">{{gridle-gutter-width}}</td>
							</tr>
						{{/if}}
						{{#if gridle-container-width}}
							<tr>
								<td>Container width</td>
								<td class="t-right">{{gridle-container-width}}</td>
							</tr>
						{{/if}}
						{{#if gridle-container-max-width}}
							<tr>
								<td>Container max width</td>
								<td class="t-right">{{gridle-container-max-width}}</td>
							</tr>
						{{/if}}		
					</tbody>
				</table>
			</div>
		`);
		return template(data);
	}
};
